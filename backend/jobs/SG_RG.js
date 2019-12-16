import { RETURN_TYPES } from "./index";
import {
  createProcessOrder,
  getProcessOrder,
  getCompanyName,
  getCompanyKey,
  getSalesOrders,
  getPurchasesOrders,
  getSeries as getJasminSeries
} from "../services/jasmin";
import {
  isProcessed,
  getCompany,
  getCorrespondence,
  getCustomerParty,
  getSellerParty,
  getSeries as getProcessSeries,
  getCorrespondenceB,
  getPurchaseOrderCorrespondence,
  isMyTurn,
  nextTurn,
  setFailedStep,
  setStoppedStep,
} from "../services/db";
import Queue from "../lib/Queue";
import getShippingDeliveries from "../services/jasmin/getShippingDeliveries";

const options = {
  
  repeat: {
    every: 60 * 1000
  }

};

export default {
  key: "SG_RG",
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
      console.log("customer party " + customerParty);

      const sellerParty = await getSellerParty({
        companyA,
        companyB
      });

      let series;
      try {
        series = (await getJasminSeries({ companyID: companyA, processID }))
          .data;
      } catch (error) {
        console.log("ERROR SERIES");
        console.error(error.response.data);
      }

      const serieKey = await getProcessSeries({ processID });
      const serie = series.find(({ serieKey: sK }) => sK === serieKey);
      console.log("SERIE " + serie + " " + serieKey);

      if (serie === undefined) {
        console.log(`ERROR: NO SERIES ${serieKey}`);
        //console.error(e.response.data);
        await setFailedStep({ processID });
        done(null, { msg: `ERROR: NO SERIES ${serieKey}` });
        return;
      }


      const companyBKey = await getCompanyKey({ companyID: companyB });
      const companyAKey = await getCompanyKey({ companyID: companyA });

      console.log("company a " + companyAKey);

      let shippingDeliveriesData, processOrdersData;

      try {
        shippingDeliveriesData = (
          await getShippingDeliveries({
            companyID: companyB,
            processID,
          })
        ).data;
        let purchasesOrdersData, salesOrdersData;
        try {
          purchasesOrdersData = (
            await getPurchasesOrders({ companyID: companyA, processID })
          ).data;
          salesOrdersData = (
            await getSalesOrders({ companyID: companyB, processID })
          ).data;
        } catch (e) {
          console.error(e.response.data);
        }

        const purchaseOrders = purchasesOrdersData.filter(
          po =>
            po.serie === serieKey &&
            po.isActive &&
            !po.isDeleted &&
            po.sellerSupplierParty == sellerParty
        );

        const shippingDeliveries = shippingDeliveriesData.filter(
          pi =>
            pi.serie === serieKey &&
            pi.isActive &&
            !pi.isDeleted &&
            pi.party == customerParty &&
            pi.documentStatus === 1
        );

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
        let allUnrep = true;
        for (const shippingDelivery of shippingDeliveries) {
          const replicated = await isProcessed({
            userID,
            fileID: shippingDelivery.id
          });
          if (!replicated) {
            areNewDocuments = true;
            console.log("new documents");
            const documentLines = [];
            let abort = false;
            for (const line of shippingDelivery.documentLines) {
              const salesOrder = salesOrdersData.filter(
                so => so.naturalKey == line.sourceDoc
              )[0];
              const purchaseOrderId = await getPurchaseOrderCorrespondence({
                salesOrder: salesOrder.id
              });
              if (purchaseOrderId !== undefined) {
                allUnrep = false;
                for (const purchaseOrder of purchaseOrders) {
                  if (purchaseOrder.id === purchaseOrderId) {
                    sourceDocKey = purchaseOrder.naturalKey;
                    //documentLines.push({sourceDocKey, sourceDocLine, quantity});
                    console.log("PURCHASE ORDER ");
                  }
                }
              } else abort = true;
              quantity = line.quantity;
              sourceDocLineNumber = line.sourceDocLine;
              console.log("line " + quantity + " " + sourceDocLineNumber);
            }
            if (!abort) {
              Queue.add("create_RG", {
                sourceDocKey,
                sourceDocLineNumber,
                quantity,
                shippingDelivery: shippingDelivery,
                processID,
                userID,
                companyKey: companyAKey,
                companyID: companyA
              });
            }
          }
        }
        if (!areNewDocuments || allUnrep) {
          console.log("NO NEW RES SG_RG");
          await setStoppedStep({ processID });
          done(null, {
            result: RETURN_TYPES.END_NO_NEW_DOCUMENTS,
            ...info,
            options
          });
        } else {
          await nextTurn({ processID });
          done(null, {
            value: RETURN_TYPES.END_SUCCESS,
            ...info,
            options
          });
        }
      } catch (e) {
        if (e.response) {
          console.error(e.response.data);
          await setFailedStep({ processID });
          done(null, {
            value: RETURN_TYPES.END_ACTION_FAIL,
            data: e.response.data,
            ...info,
            options
          });
        } else {
          console.error(e);
          await setFailedStep({ processID });
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
};
