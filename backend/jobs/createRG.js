import { addProcessed } from "../services/db";
import { RETURN_TYPES } from "./index";
import { createProcessOrder } from "../services/jasmin";

const options = {};

export default {
  key: "create_RG",
  options,
  async handle({ data }, done) {
      console.log("handle ");

    try {
      const {
        companyID,
        sourceDocKey,
        sourceDocLineNumber,
        quantity,
        userID,
        processID,
        shippingDelivery, 
        companyKey,
      } = data;
      console.log("handle 2 "+data);

      const fileID = shippingDelivery.id;
      console.log("file id "+fileID);
      
      const res = await createProcessOrder({
        companyID,
        sourceDocKey,
        sourceDocLineNumber,
        quantity, 
        companyKey,
        processID,
      });
      console.log("res " +res);

      const { status } = res;
      console.log("RG CREATION STATUS\t", status);
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
