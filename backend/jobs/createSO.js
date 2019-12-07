  import { createMinSalesOrder } from "../services/jasmin";
  import { addProcessed } from "../services/db";
  import { RETURN_TYPES } from "./index";

  const options = {};

  export default {
    key: "create_SO",
    options,
    async handle({ data }, done) {
      try {
        const {
          company,
          buyerCustomerParty,
          sellerCompany,
          documentLines,
          purchaseOrder,
          userID,
          companyID,
        } = data;

        const fileID = purchaseOrder.id;
        
        const res = await createMinSalesOrder({
          ...purchaseOrder,
          company,
          buyerCustomerParty,
          sellerCompany,
          documentLines,
          companyID
        });

        const { status } = res;
        console.log("SO CREATION STATUS\t", status);
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
