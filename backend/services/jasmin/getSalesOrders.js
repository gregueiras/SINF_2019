import makeRequest, { endPoints } from './constants';

const getSalesOrders = ({ companyID, page, pageSize, processID }) => makeRequest({
  method: 'GET',
  endPoint: endPoints.salesOrders,
  companyID,
  description: "Get Sales Orders",
  processID,
  query: {
    page,
    pageSize,
  },
});

export default getSalesOrders;
