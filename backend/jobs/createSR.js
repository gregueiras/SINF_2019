import { addProcessed, setFailedStep } from "../services/db";
import { RETURN_TYPES } from "./index";
import processOpenItems from "../services/jasmin/processOpenItems";

const options = {};

export default {
  key: "create_SR",
  options,
  async handle({ data }, done) {
    console.log("CREATE SR");
    try {
      const {
        companyID,
        sourceDoc,
        discount,
        settled,
        companyKey,
        userID,
        purchasesInvoice,
        processID,
      } = data;

      let { documentType} = purchasesInvoice;
        
      const arrs = documentType.substring(4);

      documentType = "REC_IC_" + arrs;

      console.log("DOCUMENT TYPE: " + documentType);

      const fileID = purchasesInvoice.id;
      const res = await processOpenItems({
        companyID,
        sourceDoc,
        discount,
        settled,
        companyKey,
        userID,
        processID,
      });

      const { status } = res;
      console.log("SR CREATION STATUS\t", status);
      if (status === 201) {
        await addProcessed({ userID, fileID });
        console.log("SUCCESS!");
        done(null, {
          value: RETURN_TYPES.END_SUCCESS,
          userID,
          fileID,
          options
        });
      } else {
        await setFailedStep({ processID });
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
        await setFailedStep({ processID });
        done(null, {
          value: RETURN_TYPES.END_ACTION_FAIL,
          data: e.response.data,
          options
        });
      } else {
        console.error(e);
        await setFailedStep({ processID });
        done(null, {
          value: RETURN_TYPES.END_ACTION_FAIL,
          data: e,
          options
        });
      }
    }
  }
};
