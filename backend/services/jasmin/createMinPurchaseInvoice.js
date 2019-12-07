import makeRequest, { endPoints } from './constants';

const createMinPurchaseInvoice = ({
  companyID,
  documentType,
  company,
  sellerSupplierParty,
  documentLines,
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
});

export default createMinPurchaseInvoice;