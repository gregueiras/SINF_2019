import makeRequest, { endPoints, constants } from './constants';

const createMinSalesOrder = ({company, buyerCustomerParty, deliveryTerm, documentLines}) =>
  makeRequest({
    method: "POST",
    endPoint: endPoints.salesOrders,
    data: {
        company,
        buyerCustomerParty,
        deliveryTerm,
        documentLines,
    },
    company: constants.intercompany,
  });

export default createMinSalesOrder;
