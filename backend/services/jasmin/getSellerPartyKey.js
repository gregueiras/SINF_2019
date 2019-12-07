import makeRequest, { endPoints } from './constants';

export const getSellerPartyKey = async ({ companyID, name }) => {
  const res = await makeRequest({
    method: 'GET',
    endPoint: endPoints.sellerParties,
    companyID,
  });

  try {
    const key = res.data.find(({ name: sName }) => name == sName);
    return key.partyKey;
  } catch (e) {
    return undefined;
  }
};

export const isSellerParty = async ({ companyID, key }) => {
  const res = await makeRequest({
    method: 'GET',
    endPoint: `${endPoints.sellerParties}/${key}`,
    companyID,
  });

  return res.status === 200;
};

export const getSellerParties = async ({ companyID }) => {
  const res = await makeRequest({
    method: 'GET',
    endPoint: endPoints.sellerParties,
    companyID,
  });
  return res;
};
