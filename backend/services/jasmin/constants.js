import axios from "axios";
import FormData from "form-data";
import { fetchToken, storeToken, getCompany } from "../db";

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
  billingInvoices: "billing/invoices"
};

const makeUrl = (endPoint, query, company) => {
  let url = `${constants.url}/api/${company.tenant}/${company.organization}/${endPoint}?`;

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

const makeRequest = async ({ endPoint, method, data, query, companyID }) => {
  const company = await getCompany(companyID);

  const token = await getToken(companyID);

  const url = makeUrl(endPoint, query, company);

  return axios({
    method,
    url,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};

export default makeRequest;
