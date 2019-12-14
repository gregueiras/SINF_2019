import { RETURN_TYPES } from "./index";
import {
  getCompanyKey,
  getCompanyName,
  getSeries as getJasminSeries
} from "../services/jasmin";
import {
  isProcessed,
  getCorrespondence,
  getCustomerParty,
  getSellerParty,
  getSeries as getProcessSeries,
  isMyTurn
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
    const { companyA, companyB, processID, step } = data;

    const userID = 1;

    const info = {
      userID,
      processID: 1,
      companyA,
      companyB
    };

    const active = await isMyTurn({ processID, step });

    if (!active) {
      done(null, {
        value: RETURN_TYPES.END_INVALID_STEP,
        msg: `Invalid step ${step}`,
        ...info,
        options
      });
    } else {
      const customerParty = await getCustomerParty({
        companyA,
        companyB
      });

      const sellerParty = await getSellerParty({
        companyA,
        companyB
      });

      const companyKeyA = await getCompanyKey({
        companyID: companyA,
        processID
      });
      const companyKeyB = await getCompanyKey({
        companyID: companyB,
        processID
      });

      let series;
      try {
        series = (await getJasminSeries({ companyID: companyB, processID }))
          .data;
      } catch (error) {
        console.log("ERROR SERIES");
        console.error(error.response.data);
      }
      const serieKey = await getProcessSeries({ processID });

      const serie = series.find(({ serieKey: sK }) => sK === serieKey);
      if (serie === undefined) {
        console.log(`ERROR: NO SERIES ${serieKey}`);
        //console.error(e.response.data);

        done(null, { msg: `ERROR: NO SERIES ${serieKey}` });
        return;
      }

      const processType = serieKey.substring(2).charAt(0);

      console.log("PROCESS TYPE: " + processType);

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
            documentType: "PAG_IC_" + processType,
            processID
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
            documentType: "SIIC" + processType,
            processID
          })
        ).data;

        purchasesInvoicesData = (
          await getPurchasesInvoices({ companyID: companyA, processID })
        ).data;

        salesInvoicesData = (
          await getSalesInvoices({ companyID: companyB, processID })
        ).data;
      } catch (e) {
        console.error(e.response.data);
      }

      const purchasesInvoices = purchasesInvoicesData.filter(
        pi =>
          pi.isActive &&
          !pi.isDeleted &&
          pi.sellerSupplierParty == sellerParty &&
          pi.serie === serieKey
      );

      const salesInvoices = salesInvoicesData.filter(
        pi =>
          pi.isActive &&
          !pi.isDeleted &&
          pi.buyerCustomerParty == customerParty &&
          pi.serie === serieKey
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
        const { naturalKey } = purchasesInvoice;

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

            for (const si of salesInvoices) {
              console.log(si.naturalKey);

              if (
                si.isActive &&
                !si.isDeleted &&
                si.buyerCustomerParty === customerParty &&
                si.taxTotal.amount === purchasesInvoice.taxTotal.amount &&
                si.taxTotal.baseAmount ===
                  purchasesInvoice.taxTotal.baseAmount &&
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
                      el.purchasesItem ===
                        (await getCorrespondence({
                          companyA,
                          companyB,
                          product: line.salesItem
                        }))
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

                if (receivableOpenItem !== undefined) {
                  discount = receivableOpenItem.discount;
                  amount = receivableOpenItem.amount;
                  sourceDoc = receivableOpenItem.sourceDoc;
                } else {
                  abort = true;
                }
              }
              if (!abort) {
                Queue.add("create_SR", {
                  companyID: companyB,
                  companyKey: companyKeyB,
                  discount,
                  sourceDoc,
                  settled: amount,
                  purchasesInvoice,
                  processID
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
  }
};
