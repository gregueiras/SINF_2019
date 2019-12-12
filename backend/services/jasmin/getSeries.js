import makeRequest, { endPoints } from './constants';

const getSeries = ({ companyID, processID }) => makeRequest({
  method: 'GET',
  endPoint: endPoints.series,
  companyID,
  processID,
  description:"Get Series",
});

export default getSeries;
