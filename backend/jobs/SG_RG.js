import { RETURN_TYPES } from "./index";
import {
  createProcessOrder,
  getProcessOrder,
  getCompanyName,
  getCompanyKey,
} from "../services/jasmin";
import {
  isProcessed,
  getCompany,
  getCorrespondence,
  getCustomerParty,
  getSellerParty,
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
    console.log("company b " + companyBKey);
    let shippingDeliveriesData, processOrdersData;
    try {
      shippingDeliveriesData = (await getShippingDeliveries({
        companyID: companyB
      }
      )).data;

      const shippingDeliveries = shippingDeliveriesData.filter(pi => pi.isActive && !pi.isDeleted && pi.party == customerParty && pi.documentStatus === 1);

      if (!shippingDeliveries) {
        done(null, {
          value: RETURN_TYPES.END_TRIGGER_FAIL,
          msg: `No process orders found. Please check if you have defined it correctly.`,
          ...info,
          options
        });
      }
      console.log(shippingDeliveries);
      for(const shippingDelivery of shippingDeliveries){
        
      }
    } catch (e) {
      console.log(e.response.data);
    }

    const userID = 1;

    const info = {
      userID,
      processID: 1,
      companyA,
      companyB
    };
  }
};
