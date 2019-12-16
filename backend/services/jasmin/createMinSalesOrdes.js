import makeRequest, { endPoints } from './constants';

const createMinSalesOrder = ({
  companyID,
  buyerCustomerParty,
  deliveryTerm,
  documentLines,
  sellerCompany,
  documentType,
  processID,
}) => makeRequest({
  method: 'POST',
  endPoint: endPoints.salesOrders,
  data: {
    documentType,
    company: sellerCompany,
    buyerCustomerParty,
    deliveryTerm,
    documentLines,
  },
  companyID,
  description: "Create Sales Order",
  processID,
  doc:"SO",
});

export default createMinSalesOrder;
