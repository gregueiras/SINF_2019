import { addProcessed } from "../services/db";
import { RETURN_TYPES } from "./index";
import createSalesReceipt from "../services/jasmin/createSalesReceipt";

const options = {};

export default {
  key: "create_SR",
  options,
  async handle({ data }, done) {
    console.log("CREATE SR");
    try {
      const {
        companyID,
        documentType,
        serie,
        seriesNumber,
        accountingParty,
        company,
        documentDate,
        postingDate,
        currency,
        exchangeRate,
        checkEndorsed,
        isPaymentMethodCheck,
        allowanceChargeAmount,
        grossValue,
        payableAmount,
        wTaxTotal,
        taxTotal,
        taxExclusiveAmount,
        documentLines,
        purchasesInvoice,
        financialAccount,
        userID,
      } = data;

      const fileID = purchasesInvoice.id;
      
      const res = await createSalesReceipt({
        companyID,
        documentType,
        serie,
        seriesNumber,
        accountingParty,
        company,
        documentDate,
        postingDate,
        currency,
        exchangeRate,
        checkEndorsed,
        isPaymentMethodCheck,
        allowanceChargeAmount,
        grossValue,
        payableAmount,
        wTaxTotal,
        taxTotal,
        taxExclusiveAmount,
        receiptLines: documentLines,
        financialAccount,
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
