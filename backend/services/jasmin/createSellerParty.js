import makeRequest, { endPoints } from './constants';
import { getSellerPartyKey } from './getSellerPartyKey';

const createSellerParty = async ({ companyID, name }) => {
  await makeRequest({
    method: 'POST',
    endPoint: endPoints.sellerParties,
    companyID,
    data: {
      name,
      currency: 'EUR',
      country: 'PT',
    },
  });

  const key = await getSellerPartyKey({ companyID, name });
  return key;
};

export default createSellerParty;
