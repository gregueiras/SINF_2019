import makeRequest, { endPoints, constants } from './constants';

const getSalesOrders = (page, pageSize) => makeRequest({
  method: 'GET',
  endPoint: endPoints.salesOrders,
  company: constants.intercompany,
  query: {
    page,
    pageSize,
  },
});

export default getSalesOrders;
