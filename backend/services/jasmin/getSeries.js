import makeRequest, { endPoints } from './constants';

const getSeries = ({ companyID }) => makeRequest({
  method: 'GET',
  endPoint: endPoints.series,
  companyID,
});

export default getSeries;
