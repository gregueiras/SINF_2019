import makeRequest, { endPoints, constants } from './constants';


const getPurchasesOrders = ({company, page, pageSize}) => makeRequest({
  method: 'GET',
  endPoint: endPoints.purchasesOrders,
  company,
  query: {
    page,
    pageSize,
  },
});

export default getPurchasesOrders;
