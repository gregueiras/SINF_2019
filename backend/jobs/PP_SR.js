import { RETURN_TYPES } from "./index";
import { getCompanyKey, getCompanyName } from "../services/jasmin";
import {
  isProcessed,
  getCorrespondence,
  getCustomerParty,
  getSellerParty
} from "../services/db";
import Queue from "../lib/Queue";
import getPurchasesInvoices from "../services/jasmin/getPurchasesInvoices";
import {
  getPayableOpenItems,
  getReceivableOpenItems
} from "../services/jasmin/getOpenItems";
import getSalesInvoices from "../services/jasmin/getSalesInvoices";

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

    const companyKeyA = await getCompanyKey({ companyID: companyA });
    const companyKeyB = await getCompanyKey({ companyID: companyB });

    const userID = 1;

    const info = {
      userID,
      processID: 1,
      companyA,
      companyB
    };

    let payableOpenItemsData;
    let receivableOpenItemsData;
    let purchasesInvoicesData;
    let salesInvoicesData;
    try {
      payableOpenItemsData = (
        await getPayableOpenItems({
          companyID: companyA,
          page: 1,
          pageSize: 500,
          company: companyKeyA,
          documentDate: "2029-12-12",
          documentExchangeRate: "1.0",
          party: sellerParty,
          currency: "EUR",
          documentType: "PAG"
        })
      ).data;

      receivableOpenItemsData = (
        await getReceivableOpenItems({
          companyID: companyB,
          page: 1,
          pageSize: 500,
          company: companyKeyB,
          documentDate: "2029-12-12",
          documentExchangeRate: "1.0",
          party: customerParty,
          currency: "EUR",
          documentType: "FA"
        })
      ).data;

      purchasesInvoicesData = (
        await getPurchasesInvoices({ companyID: companyA })
      ).data;

      salesInvoicesData = (await getSalesInvoices({ companyID: companyB }))
        .data;
    } catch (e) {
      console.error(e.response.data);
    }

    const purchasesInvoices = purchasesInvoicesData.filter(
      pi =>
        pi.isActive && !pi.isDeleted && pi.sellerSupplierParty == sellerParty
    );

    const salesInvoices = salesInvoicesData.filter(
      pi =>
        pi.isActive && !pi.isDeleted && pi.buyerCustomerParty == customerParty
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
      } = purchasesInvoice;

      const foundOpenItem = payableOpenItemsData.some(
        el => el.sourceDoc === naturalKey
      );
      if (!foundOpenItem) {
        const replicated = await isProcessed({
          userID,
          fileID: purchasesInvoice.id
        });
        if (!replicated) {
          console.log("NEW PP");

          let foundMatchingSI;


          //PURCHASES INVOICE: purchasesItem

          for (const si of salesInvoices) {
            console.log(si.naturalKey);

            if (
              si.isActive &&
              !si.isDeleted &&
              si.buyerCustomerParty === customerParty &&
              si.taxTotal.amount === purchasesInvoice.taxTotal.amount &&
              si.taxTotal.baseAmount === purchasesInvoice.taxTotal.baseAmount &&
              si.taxTotal.reportingAmount ===
                purchasesInvoice.taxTotal.reportingAmount &&
              si.totalLiability.amount ===
                purchasesInvoice.totalLiability.amount &&
              si.totalLiability.baseAmount ===
                purchasesInvoice.totalLiability.baseAmount &&
              si.totalLiability.reportingAmount ===
                purchasesInvoice.totalLiability.reportingAmount
            ) {
              let equal = true;
              for (const line of si.documentLines) {
                const found = purchasesInvoice.documentLines.some(
                  async el =>
                    el.grossValue.reportingAmount ===
                      line.grossValue.reportingAmount &&
                    el.grossValue.amount === line.grossValue.amount &&
                    el.grossValue.baseAmount === line.grossValue.baseAmount &&
                    el.taxExclusiveAmount.reportingAmount ===
                      line.taxExclusiveAmount.reportingAmount &&
                    el.taxExclusiveAmount.amount ===
                      line.taxExclusiveAmount.amount &&
                    el.taxExclusiveAmount.baseAmount ===
                      line.taxExclusiveAmount.baseAmount &&
                    el.unitPrice.reportingAmount ===
                      line.unitPrice.reportingAmount &&
                    el.unitPrice.amount === line.unitPrice.amount &&
                    el.unitPrice.baseAmount === line.unitPrice.baseAmount &&
                    el.quantity === line.quantity &&
                    el.lineExtensionAmount.reportingAmount ===
                      line.lineExtensionAmount.reportingAmount &&
                    el.lineExtensionAmount.amount ===
                      line.lineExtensionAmount.amount &&
                    el.lineExtensionAmount.baseAmount ===
                      line.lineExtensionAmount.baseAmount &&
                      el.purchasesItem === (await getCorrespondence({ companyA, companyB, product:line.salesItem }))
                );

                equal &= found;
              }
              if (equal) {
                foundMatchingSI = si;
                break;
              }
            }
          }

          areNewDocuments = true;

          let discount;
          let amount;
          let sourceDoc;
          try {
            let abort = true;

            if (foundMatchingSI !== undefined) {
              console.log(
                "foundMatchingSI naturalKey: " + foundMatchingSI.naturalKey
              );
              abort = false;

              const receivableOpenItem = receivableOpenItemsData.find(
                rpi => rpi.sourceDoc === foundMatchingSI.naturalKey
              );

              if(receivableOpenItem !== undefined){
                console.log("sourceDoc: " + receivableOpenItem.sourceDoc);
                discount = receivableOpenItem.discount;
                amount = receivableOpenItem.amount;
                sourceDoc = receivableOpenItem.sourceDoc;
              }else{
                abort = true;
              }
            }

            console.log("ABORT: " + abort);
            if (!abort) {
              console.log("no abort");
              console.log(sourceDoc)
              Queue.add("create_SR", {
                companyID: companyB,
                companyKey: companyKeyB,
                discount, 
                sourceDoc,
                settled: amount,
                purchasesInvoice,
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
