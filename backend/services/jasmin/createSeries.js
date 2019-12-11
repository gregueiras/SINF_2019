import makeRequest, { endPoints } from './constants';

const createSeries = ({ companyID, serieKey, description }) => makeRequest({
  method: 'POST',
  endPoint: endPoints.series,
  companyID,
  data: {
    serieKey,
    description,
    excludeAssociationOnCreateCompany: true,
  },
});

export default createSeries;
