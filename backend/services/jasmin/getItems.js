import makeRequest, { endPoints } from './constants';

const getItems = (page, pageSize) => makeRequest({
  method: 'GET',
  endPoint: endPoints.items,
  query: {
    page,
    pageSize,
  },
});

export default getItems;
