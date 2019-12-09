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
import { getPayableOpenItems, getReceivableOpenItems } from "../services/jasmin/getOpenItems";
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

    const companyName = await getCompanyName({ companyID: companyB });

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
          pageSize: 200,
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
          pageSize: 200,
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

      salesInvoicesData = (
        await getSalesInvoices({ companyID: companyB })
      ).data;

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
        currency,
        allowanceChargeAmount,
        grossValue,
        payableAmount,
        wTaxTotal,
        taxTotal,
        taxExclusiveAmount
      } = purchasesInvoice;

      console.log("pi natural key: " + naturalKey);

      const foundOpenItem = payableOpenItemsData.some(
        el => el.sourceDoc === naturalKey
      );
      console.log("foundOpenItem: " + foundOpenItem);
      if (!foundOpenItem) {
        const replicated = await isProcessed({
          userID,
          fileID: purchasesInvoice.id
        });
        if (!replicated) {
          console.log("NEW PP");

          let foundMatchingSI;


          for( const si of salesInvoices){
            console.log(si.naturalKey);

            if(si.isActive && !si.isDeleted && si.buyerCustomerParty === customerParty
               && si.taxTotal.amount === purchasesInvoice.taxTotal.amount   
                && si.taxTotal.baseAmount === purchasesInvoice.taxTotal.baseAmount 
               && si.taxTotal.reportingAmount === purchasesInvoice.taxTotal.reportingAmount 
               && si.totalLiability.amount === purchasesInvoice.totalLiability.amount   
               && si.totalLiability.baseAmount === purchasesInvoice.totalLiability.baseAmount 
              && si.totalLiability.reportingAmount === purchasesInvoice.totalLiability.reportingAmount)
              {
                let equal = true;
                for (const line of si.documentLines){
                  console.log('loop');

                  const found = purchasesInvoice.documentLines.some(el => 
                    el.grossValue.reportingAmount === line.grossValue.reportingAmount
                    && el.grossValue.amount === line.grossValue.amount
                    && el.grossValue.baseAmount === line.grossValue.baseAmount
                    && el.taxExclusiveAmount.reportingAmount === line.taxExclusiveAmount.reportingAmount
                    && el.taxExclusiveAmount.amount === line.taxExclusiveAmount.amount
                    && el.taxExclusiveAmount.baseAmount === line.taxExclusiveAmount.baseAmount
                    && el.unitPrice.reportingAmount === line.unitPrice.reportingAmount
                    && el.unitPrice.amount === line.unitPrice.amount
                    && el.unitPrice.baseAmount === line.unitPrice.baseAmount
                    && el.quantity === line.quantity
                    && el.lineExtensionAmount.reportingAmount === line.lineExtensionAmount.reportingAmount
                    && el.lineExtensionAmount.amount === line.lineExtensionAmount.amount
                    && el.lineExtensionAmount.baseAmount === line.lineExtensionAmount.baseAmount)
                    //&& el.purchasesItem === 
                    console.log("equal: " + equal);
                    console.log("found: " + found);
                  equal &= found;
                }
                if(equal){
                  console.log('deuuu');
                  foundMatchingSI = si;
                  break;
                }
            }
          }


          areNewDocuments = true;
          try {
            const documentLines = [];
            let abort = true;
     
            if(foundMatchingSI !== undefined){
              console.log("foundMatchingSI naturalKey: " + foundMatchingSI.naturalKey);
              abort = false;
            }

            /*const {
              settledAmount,
              discount,
              dueDate,
              issueDate,
              amount, 
              openAmount,
              settled,
              withholdingTaxAmount,
              openWithholdingTaxAmount,
              nature,
              currency,
              exchangeRate,
              settledOriginalAmount,
              baseExchangeRate,
              reportingExchangeRate,
              originalExchangeRate,
              sourceDoc,
            } = ;*/

            console.log("ABORT: " + abort);
            if (!abort) {
              console.log("no abort");

              Queue.add("create_SR", {
                companyID: companyB,
                documentType: "REC",
                serie: "2019",
                seriesNumber: "1",
                accountingParty: customerParty, //0001 -> customer
                company: companyName, //FEUP -> company
                documentDate: "2019-12-30T00:00:00",
                postingDate: "2019-12-30T00:00:00",
                currency,
                exchangeRate: 1.0,
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
                financialAccount: "01"
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
