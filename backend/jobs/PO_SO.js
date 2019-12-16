import { RETURN_TYPES } from "./index";
import {
  createSeries,
  getPurchasesOrders,
  getCompanyName,
  getSeries as getJasminSeries
} from "../services/jasmin";
import {
  isProcessed,
  getCompany,
  getCorrespondence,
  getCustomerParty,
  getSellerParty,
  getSeries as getProcessSeries,
  isMyTurn,
  nextTurn,
  setFailedStep,
  setStoppedStep
} from "../services/db";
import Queue from "../lib/Queue";

const options = {
  repeat: {
    every: 60 * 1000
  }
};

export default {
  key: "PO_SO",
  options,
  async handle({ data }, done) {
    const { companyA, companyB, processID, step } = data;

    const userID = 1;

    const info = {
      userID,
      processID,
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

      // get serie's purchase order
      let purchasesOrdersData;
      try {
        purchasesOrdersData = (
          await getPurchasesOrders({ companyID: companyA, processID })
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

      if (!purchaseOrders) {
        await setFailedStep({ processID });
        done(null, {
          value: RETURN_TYPES.END_TRIGGER_FAIL,
          msg: `No purchases orders found with series ${serieKey}. Please check if you have defined it correctly.`,
          ...info,
          options
        });
      }
      let areNewDocuments = false;
      for (const purchaseOrder of purchaseOrders) {
        const replicated = await isProcessed({
          userID,
          fileID: purchaseOrder.id
        });
        if (!replicated) {
          console.log("NEW PO");
          areNewDocuments = true;
          // create sales order
          // IF SERIES ERROR; MUST HAVE ICx SERIES IN DOCUMENT TYPE EVF

          try {
            // GET SELLER CUSTOM PARTY
            const company = await getCompanyName({
              companyID: companyB,
              processID
            });
            /* let key = await getSellerPartyKey({ company: cB, party });
  
            if (key === undefined) {
              key = await createSellerParty({ company: cB, name: party });
            }
            */
            const documentLines = [];
            let abort = false;
            for (const line of purchaseOrder.documentLines) {
              const {
                quantity,
                unitPrice,
                grossValue,
                taxTotal,
                lineExtensionAmount,
                purchasesItem
              } = line;

              const salesItem = await getCorrespondence({
                companyA,
                companyB,
                product: purchasesItem
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
                  salesItem
                });
              }
            }
            if (!abort) {
              console.dir({
                company,
                buyerCustomerParty: customerParty,
                deliveryTerm: purchaseOrder.deliveryTerm,
                documentLines
              });

              Queue.add("create_SO", {
                purchaseOrder,
                company,
                buyerCustomerParty: customerParty,
                sellerCompany: company,
                documentLines,
                userID,
                companyID: companyB,
                processID
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
      if (!areNewDocuments) {
        console.log("NO NEW RES PO_SO");
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
    }
  }
};
