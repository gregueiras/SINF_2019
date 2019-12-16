import makeRequest, { endPoints } from './constants';

const getShippingDeliveries = ({
  processID,
  companyID
}) => makeRequest({
  method: 'GET',
  endPoint: endPoints.getShippingDeliveries,
  companyID,
  processID,
  description: "Get Shipping Deliveries"
});

export default getShippingDeliveries;
