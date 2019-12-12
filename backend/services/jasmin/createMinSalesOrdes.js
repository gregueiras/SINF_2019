import makeRequest, { endPoints } from './constants';

const createMinSalesOrder = ({
  companyID,
  buyerCustomerParty,
  deliveryTerm,
  documentLines,
  sellerCompany,
  documentType,
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
});

export default createMinSalesOrder;
