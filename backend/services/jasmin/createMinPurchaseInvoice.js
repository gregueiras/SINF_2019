import makeRequest, { endPoints } from './constants';

const createMinPurchaseInvoice = ({
  companyID,
  documentType,
  company,
  sellerSupplierParty,
  documentLines,
  processID,
}) => makeRequest({
  method: 'POST',
  endPoint: endPoints.invoiceReceipt,
  data: {
    documentType,
    company,
    sellerSupplierParty,
    documentLines,
  },
  companyID,
  description: "Create Purchase Invoice",
  processID,
  doc: "PI",
});

export default createMinPurchaseInvoice;
