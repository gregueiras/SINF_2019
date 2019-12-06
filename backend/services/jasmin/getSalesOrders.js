import makeRequest, { endPoints } from './constants';

const getSalesOrders = ({ companyID, page, pageSize }) => makeRequest({
  method: 'GET',
  endPoint: endPoints.salesOrders,
  companyID,
  query: {
    page,
    pageSize,
  },
});

export default getSalesOrders;
