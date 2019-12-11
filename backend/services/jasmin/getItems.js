import makeRequest, { endPoints } from './constants';

const getItems = (page, pageSize, companyID) => makeRequest({
  method: 'GET',
  endPoint: endPoints.items,
  companyID,
  query: {
    page,
    pageSize,
  },
});


export default getItems;
