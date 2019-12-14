import { RETURN_TYPES } from "./index";
import {
  createSeries,
  getPurchasesOrders,
  getCompanyName,
  getSeries as getJasminSeries,
  createSalesInvoiceType,
  createPurchasesInvoiceType
} from "../services/jasmin";
import {
  isProcessed,
  getCompany,
  getCorrespondence,
  getCustomerParty,
  getSellerParty,
  getSeries as getProcessSeries
} from "../services/db";
import Queue from "../lib/Queue";

const options = {
  /*
  repeat: {
    every: 60 * 1000
  }
  */
};

export default {
  key: "SETUP",
  options,
  async handle({ data }, done) {
    const { companyA, companyB, processID, step } = data;

    const types = ["R", "G"];
    const companies = [companyA, companyB];
    // create series -> as 4, 2 de cada lado

    for (const company of companies) {
      for (const type of types) {
        try {
          await createSeries({
            companyID: company,
            serieKey: `IC${type}`,
            description: `Series to use for Intercompany Documents of type ${type}`
          });
        } catch (e) {
          console.error("REPEATED SERIES");
        }
      }
    }

    // invoice types
    //sales
    for (const type of types) {
      try {
        await createSalesInvoiceType({
          companyID: companyB,
          typeKey: `IC${type}SI`,
          serie: `IC${type}`,
          description: `Sales Invoice to use for Intercompany Documents of type ${type}`,
        });
      } catch (e) {
        console.error(e.response.data)
        console.error("REPEATED SALES INVOICE");
      }
    }
    
    //order
    for (const type of types) {
      try {
        await createPurchasesInvoiceType({
          companyID: companyA,
          typeKey: `IC${type}PI`,
          serie: `IC${type}`,
          description: `Purchases Invoice to use for Intercompany Documents of type ${type}`,
        });
      } catch (e) {
        console.error(e.response.data)
        console.error("REPEATED PURCHASE INVOICE");
      }
    }

    done(null, {end: "END"})
    
    //goods
    //good receipt type

    // order type

    // payment types

    //receipts types
  }
};
