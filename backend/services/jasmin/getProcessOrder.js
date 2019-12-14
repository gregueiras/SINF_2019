import makeRequest, { endPoints } from './constants';

const getProcessOrder = ({
  pageIndex,
  pageSize,
  companyKey,
  companyID
}) => makeRequest({
  method: 'GET',
  endPoint: endPoints.shippingProcessOrder+"/"+pageIndex+"/"+pageSize,
  query: {
    company: companyKey
  },
  companyID,
});

export default getProcessOrder;
