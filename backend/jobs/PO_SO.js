import { RETURN_TYPES } from "./index";
import {
  getSeries,
  createSeries,
  createSalesOrder,
  getPurchasesOrders,
  createMinSalesOrder,
  getCompanyName,
  isSellerParty,
  getSellerPartyKey,
  createSellerParty
} from "../services/jasmin";
import { getUsers, isProcessed, addProcessed } from "../services/db";
import { constants } from "../services/jasmin/constants";

export default {
  key: "PO_SO",
  options: {
    //    repeat: {
    //     every: 10 * 1000
    // }
  },
  async handle({ data }) {
    const { companyA, companyB } = data;
    const cA = constants[companyA];
    const cB = constants[companyB];

    const userID = 1;

    console.log(cA);
    console.log(cB);

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

    purchaseOrders.map(async purchaseOrder => {
      console.log(purchaseOrder.id);

      // TODO check if purchase order was already replicated (save this information in db)
      const replicated = await isProcessed({
        userID,
        fileID: purchaseOrder.id
      });
      console.log(replicated);
      if (replicated) {
        console.log("ALREADY PROCESSED");
      } else {
        console.log("GOOD TO GO");
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
          if (status === 201) {
            await addProcessed({ userID, fileID: purchaseOrder.id });
          }

        } catch (e) {
          if (e.response)
            console.error(e.response.data);
          else
            console.error(e)
        }
      }
    });
  }
};
