import { addProcessed, setFailedStep , addCorrespondence} from "../services/db";
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
        company,
        sellerSupplierParty,
        documentLines,
        salesInvoice,
        userID,
        processID,
      } = data;

      const fileID = salesInvoice.id;

      let { documentType} = salesInvoice;
        
      const arrs = documentType.substring(4);

      documentType = "PI_IC_" + arrs;

      console.log("DOCUMENT TYPE: " + documentType);
      
      const res = await createMinPurchaseInvoice({
        companyID,
        documentType,
        company: company,
        sellerSupplierParty,
        documentLines,
        processID,
      });

      const { status } = res;
      console.log("SI CREATION STATUS\t", status);
      if (status === 201) {
        await addProcessed({ userID, fileID });
        await addCorrespondence({purchaseOrder: res.data, salesOrder: fileID});
        console.log("SUCCESS");
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
        await setFailedStep({ processID });
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
