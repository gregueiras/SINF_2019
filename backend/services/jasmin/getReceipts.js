import makeRequest, { endPoints } from './constants';

export const getReceipts = async ({ companyID }) => {
    const res = await makeRequest({
      method: 'GET',
      endPoint: endPoints.receipts,
      companyID,
    });
    return res;
  };
  

export default getReceipts;
