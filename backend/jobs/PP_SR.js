import { RETURN_TYPES } from "./index";
import { getCompanyKey, getCompanyName } from "../services/jasmin";
import {
  isProcessed,
  getCorrespondence,
  getCustomerParty,
  getSellerParty,
} from "../services/db";
import Queue from "../lib/Queue";
import getPurchasesInvoices from "../services/jasmin/getPurchasesInvoices";
import { getOpenItems } from "../services/jasmin/getOpenItems";

const options = {
  /*
  repeat: {
    every: 60 * 1000
  }
  */
};

export default {
  key: "PP_SR",
  options,
  async handle({ data }, done) {
    const { companyA, companyB } = data;

    const customerParty = await getCustomerParty({
      companyA,
      companyB
    });

    const sellerParty = await getSellerParty({
      companyA,
      companyB
    });

    const companyKey = await getCompanyKey({ companyID: companyA });           
    const companyName = await getCompanyName({ companyID: companyB });


    console.log("companyName: " + companyName);

    const userID = 1;

    const info = {
      userID,
      processID: 1,
      companyA,
      companyB
    };

    let openItemsData = (
      await getOpenItems({
        companyID: companyA,
        page: 1,
        pageSize: 200,
        company: companyKey,
        documentDate: "2029-12-12",
        documentExchangeRate: "1.0",
        party: sellerParty,
        currency: "EUR",
        documentType: "PAG"
      })
    ).data;

    // get serie's purchase order
    let purchasesInvoicesData;
    try {
      purchasesInvoicesData = (
        await getPurchasesInvoices({ companyID: companyA })
      ).data;
    } catch (e) {
      console.error(e.response.data);
    }

    const purchasesInvoices = purchasesInvoicesData.filter(
      pi =>
        pi.isActive && !pi.isDeleted && pi.sellerSupplierParty == sellerParty
    );

    if (!purchasesInvoices) {
      done(null, {
        value: RETURN_TYPES.END_TRIGGER_FAIL,
        msg: `No purchases invoices found. Please check if you have defined it correctly.`,
        ...info,
        options
      });
    }
    let areNewDocuments = false;
    for (const purchasesInvoice of purchasesInvoices) {
      const { 
        naturalKey,
        currency,
        allowanceChargeAmount,
        grossValue,
        payableAmount,
        wTaxTotal,
        taxTotal,
        taxExclusiveAmount,
       } = purchasesInvoice;


      const found = openItemsData.some(el => el.sourceDoc === naturalKey);
        console.log("found: " + found)
      if (!found) {
        const replicated = await isProcessed({
          userID,
          fileID: purchasesInvoice.id
        });
        if (!replicated) {
          console.log("NEW PP");
          areNewDocuments = true;
          try {
            const documentLines = [];
            let abort = false;
            for (const line of purchasesInvoice.documentLines) {
              const {
                quantity,
                unitPrice,
                grossValue,
                taxTotal,
                lineExtensionAmount,
                purchasesItem
              } = line;
              console.log(line);
              const salesItem = await getCorrespondence({
                companyA,
                companyB,
                product: purchasesItem,
              });

              if (salesItem === undefined) {
                abort = true;
                // LOG UNDEFINED CORRESPONDENCE done(RETURN_TYPES.END_ACTION_FAIL, {value: `There is no correspondence of ${purchasesItem} in ${companyA} and ${companyB}`})
              } else {
                documentLines.push({
                  quantity,
                  unitPrice,
                  deliveryDate: "2019-12-30T00:00:00",
                  grossValue,
                  taxTotal,
                  lineExtensionAmount,
                  exchangeRate: 1.000000,
                  purchasesItem
                });
              }
            }
            console.log("ABORT: " + abort);
            if (!abort) {
              console.log("no abort");

              Queue.add('create_SR', {
                companyID: companyB,
                documentType: 'REC',
                serie: '2019',
                seriesNumber: '1',
                accountingParty: customerParty, //0001 -> customer
                company: companyName, //FEUP -> company
                documentDate: '2019-12-30T00:00:00',
                postingDate: '2019-12-30T00:00:00',
                currency,
                exchangeRate: 1.000000,
                checkEndorsed: false,
                isPaymentMethodCheck: false,
                allowanceChargeAmount,
                grossValue,
                payableAmount,
                wTaxTotal,
                taxTotal,
                taxExclusiveAmount,
                documentLines,
                purchasesInvoice,
                userID,
                financialAccount: "01",
                });
            }
          } catch (e) {
            if (e.response) {
              console.error(e.response.data);
              done(null, {
                value: RETURN_TYPES.END_ACTION_FAIL,
                data: e.response.data,
                ...info,
                options
              });
            } else {
              console.error(e);
              done(null, {
                value: RETURN_TYPES.END_ACTION_FAIL,
                ...info,
                data: e,
                options
              });
            }
          }
        }
      }
    }
    if (!areNewDocuments) {
      console.log("NO NEW RES");
      done(null, {
        result: RETURN_TYPES.END_NO_NEW_DOCUMENTS,
        ...info,
        options
      });
    } else {
      done(null, {
        value: RETURN_TYPES.END_SUCCESS,
        ...info,
        options
      });
    }
  }
};
