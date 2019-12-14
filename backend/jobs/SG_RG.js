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
import { getPurchaseOrderCorrespondence } from "../services/db/order";

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
      let sourceDocKey, quantity, sourceDocLineNumber;

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
            const purchaseOrderId = await getPurchaseOrderCorrespondence({salesOrder: salesOrder.id});
            if (purchaseOrderId !== undefined){
            for(const purchaseOrder of purchaseOrders){
            
              
              if (purchaseOrder.id === purchaseOrderId){
                sourceDocKey = purchaseOrder.naturalKey;
                //documentLines.push({sourceDocKey, sourceDocLine, quantity});
                console.log("PURCHASE ORDER ");
              } 
            }
          }else abort = true;
          quantity = line.quantity;
          sourceDocLineNumber = line.sourceDocLine;
          console.log("line "+quantity+" "+sourceDocLineNumber);
        }
        if (!abort) {
          console.log("abort " + abort);
          console.log("company a " + companyAKey);
           Queue.add("create_RG", {sourceDocKey, 
           sourceDocLineNumber , quantity,
            shippingDelivery: shippingDelivery,
            processID, userID, companyKey: companyAKey, companyID: companyA
           });
        }

      }
    }
    } catch(e) {
    console.log(e.response.data);
  }

}
};
