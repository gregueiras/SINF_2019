import makeRequest, { endPoints } from './constants';


const getPurchasesOrders = ({ companyID, page, pageSize }) => makeRequest({
  method: 'GET',
  endPoint: endPoints.purchasesOrders,
  companyID,
  query: {
    page,
    pageSize,
  },
});

export default getPurchasesOrders;
