import makeRequest, { endPoints, constants } from './constants';

const createSeries = ({ company, serieKey, description }) =>
  makeRequest({
    method: "POST",
    endPoint: endPoints.series,
    company,
    data: {
      serieKey,
      description,
      excludeAssociationOnCreateCompany: true
    }
  });

export default createSeries;
