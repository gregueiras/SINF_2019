import makeRequest, { endPoints, constants } from './constants';


const getPurchasesOrders = (page, pageSize) => makeRequest({
  method: 'GET',
  endPoint: endPoints.purchasesOrders,
  company: constants.intercompany,
  query: {
    page,
    pageSize,
  },
});

export default getPurchasesOrders;
