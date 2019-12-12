import makeRequest, { endPoints } from './constants';

const getSalesOrders = ({ companyID, page, pageSize, processID }) => makeRequest({
  method: 'GET',
  endPoint: endPoints.salesOrders,
  companyID,
  description: "Process Open Items",
  processID,
  query: {
    page,
    pageSize,
  },
});

export default getSalesOrders;
