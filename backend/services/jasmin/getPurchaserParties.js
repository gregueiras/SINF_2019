import makeRequest, { endPoints } from './constants';

export const getPurchaserParties = async ({ companyID }) => {
  const res = await makeRequest({
    method: 'GET',
    endPoint: endPoints.purchaserParties,
    companyID,
  });
  return res;
};
