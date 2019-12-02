import makeRequest, { endPoints, constants } from './constants';

const getSalesOrders = ({company, page, pageSize}) => makeRequest({
  method: 'GET',
  endPoint: endPoints.salesOrders,
  company,
  query: {
    page,
    pageSize,
  },
});

export default getSalesOrders;
