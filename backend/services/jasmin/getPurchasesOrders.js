import makeRequest, { endPoints } from './constants';


const getPurchasesOrders = (page, pageSize) => makeRequest({
  method: 'GET',
  endPoint: endPoints.purchasesOrders,
  query: {
    page,
    pageSize,
  },
});

export default getPurchasesOrders;
