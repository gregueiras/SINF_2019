import makeRequest, { endPoints, constants } from './constants';

const getSeries = () =>
  makeRequest({
    method: "GET",
    endPoint: endPoints.series,
    company: constants.intercompany,
  });

export default getSeries;
