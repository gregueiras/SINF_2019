  import { createMinSalesOrder } from "../services/jasmin";
  import { addProcessed,  setFailedStep } from "../services/db";
  import { RETURN_TYPES } from "./index";
import { addCorrespondence } from "../services/db/order";

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
          processID,
        } = data;

        const fileID = purchaseOrder.id;

        //get document type -> TODO create aux function

        let { documentType } = purchaseOrder;
        
        const arrs = documentType.split("_");

        documentType = "EC_" + arrs[1] + "_" + arrs[2];
        
        const res = await createMinSalesOrder({
          ...purchaseOrder,
          company: company,
          buyerCustomerParty,
          sellerCompany,
          documentLines,
          companyID,
          documentType,
          processID,
        });

        const { status } = res;
        console.log("SO CREATION STATUS\t", status);
        if (status === 201) {
          await addProcessed({ userID, fileID });
          await addCorrespondence({purchaseOrder: fileID, salesOrder: res.data});
          console.log("SUCCESS SO CREATION");
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
