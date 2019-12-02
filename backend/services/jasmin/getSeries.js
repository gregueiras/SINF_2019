import makeRequest, { endPoints, constants } from './constants';

const getSeries = ({company}) =>
  makeRequest({
    method: "GET",
    endPoint: endPoints.series,
    company,
  });

export default getSeries;
