import { createMinSalesOrder } from "../services/jasmin";
import { addProcessed } from "../services/db";
import { RETURN_TYPES } from "./index";

const options = {};

export default {
  key: "create_PI",
  options,
  async handle({ data }, done) {
      /**  companyID,
  buyerCustomerParty,
  documentLines, */
    try {
      const {
        company,
        buyerCustomerParty,
        documentLines,
        salesOrder,
        userID,
        companyID,
      } = data;

      const fileID = salesOrder.id;
      
      const res = await createMinSalesOrder({
        buyerCustomerParty,
        documentLines,
        companyID
      });

      const { status } = res;
      console.log("SI CREATION STATUS\t", status);
      if (status === 201) {
        await addProcessed({ userID, fileID });
        console.log("SUCCESS");
        done(null, {
          value: RETURN_TYPES.END_SUCCESS,
          userID,
          fileID,
          options
        });
      } else {
        done(null, {
          value: RETURN_TYPES.END_ACTION_FAIL,
          status,
          userID,
          fileID,
          options
        })
      }
    } catch (e) {
      if (e.response) {
        console.error(e.response.data);
        done(null, {
          value: RETURN_TYPES.END_ACTION_FAIL,
          data: e.response.data,
          options
        });
      } else {
        console.error(e);
        done(null, {
          value: RETURN_TYPES.END_ACTION_FAIL,
          data: e,
          options
        });
      }
    }
  }
};
