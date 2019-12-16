import makeRequest, { endPoints } from './constants';

const getItems = (companyID) => makeRequest({
  method: 'GET',
  endPoint: endPoints.items,
  companyID,
});


export default getItems;
