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

    // create series -> as 4, 2 de cada lado

    const promises = [];
    //promises.push(createSeries())

    // invoice types
        //sales
        //order

//goods
    //good receipt type


    // order type

    // payment types


    //receipts types
    
  }
};
