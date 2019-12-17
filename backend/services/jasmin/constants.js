import axios from "axios";
import FormData from "form-data";
import {
  fetchToken,
  storeToken,
  getCompany,
  storeLog,
  updateStateLog
} from "../db";
import { getProcessTypeName } from "../db/process";
import getSalesOrders from "./getSalesOrders";
import { getPurchasesInvoices } from ".";
import getReceipts from "./getReceipts";

export const constants = {
  url: "https://my.jasminsoftware.com",
  intercompany: {
    tenant: "224900",
    organization: "224900-0001",
    clientId: "FEUP-SINF",
    clientSecret: "92f0a4da-64ee-4449-99e4-f93df1038980"
  },
  feup: {
    tenant: "226890",
    organization: "226890-0001",
    clientId: "FEUP-SINF-2",
    clientSecret: "fb3887ba-6189-43dc-8e97-0ea104c575ec"
  },
  ritaNorinho: {
    tenant: "226459",
    organization: "226459-0001",
    clientId: "FEUP-SINF",
    clientSecret: "92f0a4da-64ee-4449-99e4-f93df1038980"
  },
  grantType: "client_credentials",
  scope: "application"
};

export const endPoints = {
  salesOrders: "sales/orders",
  purchasesOrders: "purchases/orders",
  series: "businesscore/series",
  items: "businesscore/items",
  sellerParties: "salesCore/customerParties",
  purchaserParties: "purchasesCore/supplierParties",
  companies: "corepatterns/companies",
  invoiceReceipt: "invoiceReceipt/invoices",
  billingInvoices: "billing/invoices",
  payableOpenItems: "accountsPayable/processOpenItems", //intercompany
  receipts: "accountsReceivable/receipts", //feup
  receivebleOpenItems: "accountsReceivable/processOpenItems",
  salesInvoiceTypes: "salesCore/invoiceTypes",
  purchasesInvoiceTypes: "purchasesCore/invoiceTypes",
  goodsReceipt: "goodsReceipt/processOrders",
  shippingProcessOrder: "shipping/processOrders",
  getShippingDeliveries: "shipping/deliveries"
};

const makeUrl = (endPoint, query, company) => {
  let url = `${constants.url}/api/${company.tenant}/${company.organization}/${endPoint}?`;
  //console.log("URL "+url);

  if (query) {
    Object.keys(query).forEach(key => {
      if (query[key]) url += `${key}=${query[key]}&`;
    });
  }

  return url;
};

const getTokenFromJasmin = async company => {
  const formData = new FormData();
  formData.append("grant_type", constants.grantType);
  formData.append("client_id", company.clientId);
  formData.append("client_secret", company.clientSecret);
  formData.append("scope", constants.scope);

  const { data } = await axios.post(
    "https://identity.primaverabss.com/connect/token",
    formData,
    {
      headers: {
        ...formData.getHeaders()
      }
    }
  );
  const { access_token, expires_in } = data;

  return { token: access_token, expires: expires_in };
};

const getToken = async companyID => {
  const db = await fetchToken(companyID);

  if (db.id) {
    const { token, expires } = await getTokenFromJasmin(db);

    const newExpire = Date.now() + expires;

    await storeToken({ companyID, token, expires: newExpire });

    return token;
  }

  return db;
};

const getDocNaturalKey = async ({ doc, companyID, id }) => {
  console.log("COMPANYID: " + companyID);
  console.log("DOC: " + doc);
  console.log("ID: " + id);

  try {
    if (doc === "SO") {
      const salesOrdersData = (await getSalesOrders({ companyID })).data;
      const salesOrder = salesOrdersData.find(el => el.id == id);
      return salesOrder.naturalKey;
    }
    if (doc === "PI") {
      const purchasesIvoiceData = (await getPurchasesInvoices({ companyID }))
        .data;
      const purchasesIvoice = purchasesIvoiceData.find(el => el.id == id);
      return purchasesIvoice.naturalKey;
    }
    if (doc === "SR") {
      const salesReceiptsData = (await getReceipts({ companyID })).data;
      const salesReceipt = salesReceiptsData.find(el => el.id == id);
      return salesReceipt.naturalKey;
    }
  } catch (e) {
    console.error(e);
    return "none";
  }

  return "none";
};

const makeRequest = async ({
  endPoint,
  method,
  data,
  query,
  companyID,
  processID,
  description,
  doc
}) => {
  const company = await getCompany(companyID);

  const token = await getToken(companyID);

  //console.log(" data constant " + data);

  const url = makeUrl(endPoint, query, company);
  const res = await axios({
    method,
    url,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  //console.log(url);

  if (processID !== undefined && description !== undefined) {
    let createdDoc = "none";
    if (doc !== undefined)
      createdDoc = await getDocNaturalKey({ doc, companyID, id: res.data });

    let state = "Failed";
    if (res.status === 200 || res.status === 201 || res.status === 204) {
      state = "Completed";
    }
    await storeLog({
      state,
      description,
      process_id: processID,
      createdDoc
    });
  }

  return res;
};

export default makeRequest;
