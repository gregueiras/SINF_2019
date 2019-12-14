import makeRequest, { endPoints } from "../constants";

const createSalesInvoiceType = async ({ companyID, typeKey, serie, description }) => {
  const res = await makeRequest({
    method: "POST",
    endPoint: endPoints.salesInvoiceTypes,
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
    companyID,
  });
  return res;
};

export default createSalesInvoiceType;
