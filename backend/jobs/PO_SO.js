import { RETURN_TYPES } from "./index";
import { getSeries, createSeries, createSalesOrder, getPurchasesOrders } from "../services/jasmin";
import { getUsers } from "../services/db"

export default {
  key: "PO_SO",
  options: {
    //    repeat: {
    //     every: 10 * 1000
    // }
  },
  async handle({ data }) {
    const users = await getUsers()

    console.log(users.data);
    const { companyA, companyB } = data;

    // Check if 'INTERCOMPANY_COMPANYA_COMPANYB' series exist
    const series = (await getSeries()).data;

    // TODO: GET INTERCOMPANY ID FROM DATABASE
    const in_id = 1;
    const serieName = `IC${in_id}`;
    const serie = series.find(({ serieKey }) => serieKey === serieName);

    if (serie === undefined) {
      const description = `Series to intercompany documents between ${companyA} and ${companyB}`;
      await createSeries(serieName, description);
    }

    // get serie's purchase order
    const purchasesOrders = (await getPurchasesOrders()).data;
    const purchaseOrder = purchasesOrders.find(po => po.serie === serieName);
    
    //console.log(purchaseOrder);

    // TODO check if purchase order was already replicated (save this information in db)

    // create sales order
    // IF SERIES ERROR; MUST HAVE ICx SERIES IN DOCUMENT TYPE EVF

    //await createSalesOrder(purchaseOrder);
  

  }
};
