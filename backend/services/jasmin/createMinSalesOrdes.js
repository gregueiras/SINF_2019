import makeRequest, { endPoints } from './constants';

const createMinSalesOrder = ({company, buyerCustomerParty, deliveryTerm, documentLines}) =>
  makeRequest({
    method: "POST",
    endPoint: endPoints.salesOrders,
    data: {
        company,
        buyerCustomerParty,
        deliveryTerm,
        documentLines,
    }
  });

export default createMinSalesOrder;
