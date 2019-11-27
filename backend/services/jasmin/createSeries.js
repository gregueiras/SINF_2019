import makeRequest, { endPoints } from './constants';

const createSeries = (serieKey, description) =>
  makeRequest({
    method: "POST",
    endPoint: endPoints.series,
    data: {
      serieKey,
      description,
      excludeAssociationOnCreateCompany: true
    }
  });

export default createSeries;
