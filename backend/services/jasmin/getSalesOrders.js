import makeRequest, { endPoints } from './constants';

const getSalesOrders = (page, pageSize) => makeRequest({
  method: 'GET',
  endPoint: endPoints.salesOrders,
  query: {
    page,
    pageSize,
  },
});

export default getSalesOrders;
