import makeRequest, { endPoints, constants } from './constants';

const createMinSalesOrder = ({
  company,
  buyerCustomerParty,
  deliveryTerm,
  documentLines,
  sellerCompany
}) =>
  makeRequest({
    method: "POST",
    endPoint: endPoints.salesOrders,
    data: {
      company: sellerCompany,
      buyerCustomerParty,
      deliveryTerm,
      documentLines
    },
    company
  });

export default createMinSalesOrder;
