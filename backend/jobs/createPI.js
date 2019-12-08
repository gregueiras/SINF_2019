import { addProcessed } from "../services/db";
import { RETURN_TYPES } from "./index";
import createMinPurchaseInvoice from "../services/jasmin/createMinPurchaseInvoice";

const options = {};

export default {
  key: "create_PI",
  options,
  async handle({ data }, done) {

    try {
      const {
        companyID,
        documentType,
        company,
        sellerSupplierParty,
        documentLines,
        salesInvoice,
        userID,
      } = data;

      const fileID = salesInvoice.id;
      
      const res = await createMinPurchaseInvoice({
        companyID,
        documentType,
        company: company,
        sellerSupplierParty,
        documentLines,
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
