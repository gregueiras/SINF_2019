import makeRequest, { endPoints } from './constants';

const createMinSalesOrder = ({
  companyID,
  buyerCustomerParty,
  deliveryTerm,
  documentLines,
  sellerCompany,
}) => makeRequest({
  method: 'POST',
  endPoint: endPoints.salesOrders,
  data: {
    company: sellerCompany,
    buyerCustomerParty,
    deliveryTerm,
    documentLines,
  },
  companyID,
});

export default createMinSalesOrder;
