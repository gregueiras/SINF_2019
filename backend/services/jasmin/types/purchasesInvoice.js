import makeRequest, { endPoints } from "../constants";

const createPurchasesInvoiceType = async ({ companyID, typeKey, serie, description }) => {
  const res = await makeRequest({
    method: "POST",
    endPoint: endPoints.purchasesInvoiceTypes,
    data: {
      typeKey,
      fiscalDocumentType: "FS",
      documentTypeSeries: [
        {
          serie,
          isDefault: true
        }
      ],
      description,
    },
    companyID
  });
  return res;
};

export default createPurchasesInvoiceType;
