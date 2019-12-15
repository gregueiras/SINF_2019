import { RETURN_TYPES } from "./index";
import {
  getCompanyKey,
  getSeries as getJasminSeries
} from "../services/jasmin";
import {
  isProcessed,
  getCorrespondenceB,
  getCustomerParty,
  getSellerParty,
  getSeries as getProcessSeries,
  isMyTurn,
  nextTurn,
  setFailedStep,
  setStoppedStep
} from "../services/db";
import getSalesInvoices from "../services/jasmin/getSalesInvoices";

import Queue from "../lib/Queue";

const options = {
  repeat: {
    every: 60 * 1000
  }
};

export default {
  key: "SI_PI",
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

      const company = await getCompanyKey({ companyID: companyA, processID });

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
        await setFailedStep({ processID });
        done(null, { msg: `ERROR: NO SERIES ${serieKey}` });
        return;
      }

      // get serie's purchase order
      let salesInvoicesData;
      try {
        salesInvoicesData = (
          await getSalesInvoices({ companyID: companyB, processID })
        ).data;
      } catch (e) {
        console.error(e.response.data);
      }

      console.log("seriekey: " + serieKey);
      const salesInvoices = salesInvoicesData.filter(
        si =>
          si.serie === serieKey &&
          si.isActive &&
          !si.isDeleted &&
          si.buyerCustomerParty == customerParty //0001
      );

      if (!salesInvoices) {
        done(null, {
          value: RETURN_TYPES.END_TRIGGER_FAIL,
          msg: `No purchases orders found with series ${serieKey}. Please check if you have defined it correctly.`,
          ...info,
          options
        });
      }

      let areNewDocuments = false;
      for (const salesInvoice of salesInvoices) {
        const replicated = await isProcessed({
          userID,
          fileID: salesInvoice.id
        });
        if (!replicated) {
          console.log("NEW SI");
          areNewDocuments = true;
          try {
            const documentLines = [];
            let abort = false;
            for (const line of salesInvoice.documentLines) {
              const {
                quantity,
                unitPrice,
                grossValue,
                taxTotal,
                lineExtensionAmount,
                salesItem
              } = line;
              const purchasesItem = await getCorrespondenceB({
                companyA,
                companyB,
                product: salesItem //TAP1
              });

              if (purchasesItem === undefined) {
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
                  purchasesItem
                });
              }
            }
            console.log(abort);
            if (!abort) {
              Queue.add("create_PI", {
                salesInvoice,
                company, //FEUP-GX
                documentLines,
                sellerSupplierParty: sellerParty,
                userID,
                companyID: companyA,
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
        console.log("NO NEW RES SI_PI");
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
