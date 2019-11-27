import makeRequest, { endPoints } from './constants';

const getSeries = () =>
  makeRequest({
    method: "GET",
    endPoint: endPoints.series
  });

export default getSeries;
