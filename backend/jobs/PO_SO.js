import { RETURN_TYPES } from "./index";
import {
  getSeries,
  createSeries,
  getPurchasesOrders,
  createMinSalesOrder,
  getCompanyName,
  getSellerPartyKey,
  createSellerParty
} from "../services/jasmin";
import { isProcessed, addProcessed } from "../services/db";
import { constants } from "../services/jasmin/constants";

const options = {
  repeat: {
    every: 60 * 1000
  }
};

export default {
  key: "PO_SO",
  options,
  async handle({ data }, done) {
    const { companyA, companyB } = data;
    const cA = constants[companyA];
    const cB = constants[companyB];

    const userID = 1;

    const info = {
      userID,
      processID: 1,
      companyA,
      companyB
    };

    let series;
    try {
      series = (await getSeries({ company: cA })).data;
    } catch (error) {
      console.error(error.response.data);
    }
    // Check if 'IC_1' series exist

    // TODO: GET INTERCOMPANY ID FROM DATABASE
    const in_id = 1;
    const serieKey = `IC${in_id}`;
    const serie = series.find(({ serieKey: sK }) => sK === serieKey);

    if (serie === undefined) {
      const description = `Series to intercompany documents between ${companyA} and ${companyB}`;
      try {
        await createSeries({ company: cA, serieName: serieKey, description });
      } catch (e) {
        console.error(e.response.data);
      }
    }

    // get serie's purchase order
    let purchasesOrdersData;
    try {
      purchasesOrdersData = (await getPurchasesOrders({ company: cA })).data;
    } catch (e) {
      console.error(e.response.data);
    }

    const purchaseOrders = purchasesOrdersData.filter(
      po => po.serie === serieKey && po.isActive && !po.isDeleted
    );

    if (!purchaseOrders) {
      done(null, {
        value: RETURN_TYPES.END_TRIGGER_FAIL,
        msg: `No purchases orders found with series ${serieKey}. Please check if you have defined it correctly.`,
        ...info,
        options
      });
    }
    let isNewDocuments = false;

    for (const purchaseOrder of purchaseOrders) {
      console.log("PO")
      // TODO check if purchase order was already replicated (save this information in db)
      const replicated = await isProcessed({
        userID,
        fileID: purchaseOrder.id
      });
      if (!replicated) {
        console.log("NEW PO")
        isNewDocuments = true;
        // create sales order
        // IF SERIES ERROR; MUST HAVE ICx SERIES IN DOCUMENT TYPE EVF

        try {
          // GET SELLER CUSTOM PARTY
          const party = await getCompanyName({ company: cA });
          let key = await getSellerPartyKey({ company: cB, party });

          if (key === undefined) {
            key = await createSellerParty({ company: cB, name: party });
          }

          const documentLines = purchaseOrder.documentLines.map(line => {
            // GET CORRESPONDING ID from line.purchasesItem
            const salesItem = "prodPaVender";
            const {
              quantity,
              unitPrice,
              grossValue,
              taxTotal,
              lineExtensionAmount
            } = line;

            return {
              quantity,
              unitPrice,
              deliveryDate: "2019-12-30T00:00:00",
              grossValue,
              taxTotal,
              lineExtensionAmount,
              salesItem
            };
          });

          const partyB = await getCompanyName({ company: cB });
          console.dir({
            company: partyB,
            buyerCustomerParty: key,
            deliveryTerm: purchaseOrder.deliveryTerm,
            documentLines
          });

          const res = await createMinSalesOrder({
            ...purchaseOrder,
            company: cB,
            buyerCustomerParty: key,
            sellerCompany: partyB,
            documentLines
          });

          const { status } = res;
          console.log(status);
          console.log(status === 201);
          if (status === 201) {
            await addProcessed({ userID, fileID: purchaseOrder.id });
            console.log("SUCCESS");
            //done(null, { value: RETURN_TYPES.END_SUCCESS, ...info, options });
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
    };

    if (!isNewDocuments) {
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
