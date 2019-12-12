import makeRequest, { endPoints } from './constants';

const getShippingDeliveries = ({

  companyID
}) => makeRequest({
  method: 'GET',
  endPoint: endPoints.getShippingDeliveries,
  companyID,
});

export default getShippingDeliveries;
