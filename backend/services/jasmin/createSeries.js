import makeRequest, { endPoints, constants } from './constants';

const createSeries = (serieKey, description) =>
  makeRequest({
    method: "POST",
    endPoint: endPoints.series,
    company: constants.intercompany,
    data: {
      serieKey,
      description,
      excludeAssociationOnCreateCompany: true
    }
  });

export default createSeries;
