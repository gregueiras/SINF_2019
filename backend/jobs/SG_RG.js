import { RETURN_TYPES } from "./index";
import {
  createProcessOrder,
  getProcessOrder,
  getCompanyName,
  getCompanyKey,
  getSalesOrders,
  getPurchasesOrders,
} from "../services/jasmin";
import {
  isProcessed,
  getCompany,
  getCorrespondence,
  getCustomerParty,
  getSellerParty,
  getCorrespondenceB,
} from "../services/db";
import Queue from "../lib/Queue";
import getShippingDeliveries from "../services/jasmin/getShippingDeliveries";

const options = {
  /*
  repeat: {
    every: 60 * 1000
  }
  */
};

export default {
  key: "SG_RG",
  options,
  async handle({ data }, done) {
    const { companyA, companyB, processID, step } = data;

    const customerParty = await getCustomerParty({
      companyA,
      companyB
    });
    console.log("customer party " + customerParty);

    const sellerParty = await getSellerParty({
      companyA,
      companyB
    });
    const companyBKey = await getCompanyKey({ companyID: companyB });
    const companyAKey = await getCompanyKey({ companyID: companyA });
    console.log("company a " + companyAKey);
    let shippingDeliveriesData, processOrdersData;

    const userID = 1;

    const info = {
      userID,
      processID: 1,
      companyA,
      companyB
    };
    try {
      shippingDeliveriesData = (await getShippingDeliveries({
        companyID: companyB
      }
      )).data;
      let purchasesOrdersData, salesOrdersData;
      try {
        purchasesOrdersData = (await getPurchasesOrders({ companyID: companyA, processID }))
          .data;
        salesOrdersData = (await getSalesOrders({ companyID: companyB, processID })).data;
      } catch (e) {
        console.error(e.response.data);
      }

      const purchaseOrders = purchasesOrdersData.filter(
        po =>
          po.isActive &&
          !po.isDeleted &&
          po.sellerSupplierParty == sellerParty
      );


      const shippingDeliveries = shippingDeliveriesData.filter(pi => pi.isActive && !pi.isDeleted && pi.party == customerParty && pi.documentStatus === 1);

      if (!shippingDeliveries) {
        done(null, {
          value: RETURN_TYPES.END_TRIGGER_FAIL,
          msg: `No process orders found. Please check if you have defined it correctly.`,
          ...info,
          options
        });
      }
      let areNewDocuments = false;

      for (const shippingDelivery of shippingDeliveries) {
        const replicated = await isProcessed({ userID, fileID: shippingDelivery.id });
        if (!replicated) {
          areNewDocuments = true;
          console.log("new documents");
          const documentLines = [];
          let abort = false;
          for (const line of shippingDelivery.documentLines) {
            const salesOrder = salesOrdersData.filter(
              so =>
                so.naturalKey == line.sourceDoc
            )[0];
            console.log("sales order filter");
            let foundMatchingSI;
            for (const si of purchaseOrders) {
              console.log("sales order  "+JSON.stringify(si.grossValue.amount)+" "+JSON.stringify(salesOrder.grossValue.amount));

              if (si.payableAmount.amount === salesOrder.grossValue.amount){
                let equal = true;
                console.log("purchase filter");

                for (const line1 of si.documentLines) {
                  console.log("line1 filter");
                  const found = salesOrder.documentLines.some(
                    async el =>
                      el.grossValue.reportingAmount ===
                      line1.grossValue.reportingAmount &&
                      el.grossValue.amount === line1.grossValue.amount &&
                      el.grossValue.baseAmount === line1.grossValue.baseAmount &&
                      el.taxExclusiveAmount.reportingAmount ===
                      line1.taxExclusiveAmount.reportingAmount &&
                      el.taxExclusiveAmount.amount ===
                      line1.taxExclusiveAmount.amount &&
                      el.taxExclusiveAmount.baseAmount ===
                      line1.taxExclusiveAmount.baseAmount &&
                      el.unitPrice.reportingAmount ===
                      line1.unitPrice.reportingAmount &&
                      el.unitPrice.amount === line1.unitPrice.amount &&
                      el.unitPrice.baseAmount === line1.unitPrice.baseAmount &&
                      el.quantity === line1.quantity &&
                      el.lineExtensionAmount.reportingAmount ===
                      line1.lineExtensionAmount.reportingAmount &&
                      el.lineExtensionAmount.amount ===
                      line1.lineExtensionAmount.amount &&
                      el.lineExtensionAmount.baseAmount ===
                      line1.lineExtensionAmount.baseAmount &&
                      el.salesItem === (await getCorrespondenceB({ companyA, companyB, product: line1.purchasesItem }))
                  );

                  equal &= found;
                }
                if (equal) {
                  foundMatchingSI = si;
                  console.log("FOUND   "+ foundMatchingSI);
                  break;
                }
              }

            }
          }
          /*const {
            sourceDocKey: line.sourceDoc,
            sourceDocLineNumber: 
          } = data;*/

          let sourceDocKey = "ECF.2019.3";
          let sourceDocLineNumber = 1;
          let quantity = 1;
        }
        if (!abort) {

          console.log("abort " + abort);
          console.log("company a " + companyAKey);
          /* Queue.add("create_RG", {sourceDocKey: "ECF.2019.3", 
           sourceDocLineNumber: 1, quantity: 1,
            shippingDelivery: shippingDelivery,
            processID, userID, companyKey: companyAKey, companyID: companyA
           });*/
        }

      }
    } catch(e) {
    console.log(e.response.data);
  }

}
};
