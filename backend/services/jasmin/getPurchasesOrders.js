import makeRequest, { endPoints } from './constants';


const getPurchasesOrders = ({ companyID, page, pageSize, processID }) => makeRequest({
  method: 'GET',
  endPoint: endPoints.purchasesOrders,
  companyID,
  query: {
    page,
    pageSize,
  },
  processID,
  description:"Get Purchases Orders",
});

export default getPurchasesOrders;
