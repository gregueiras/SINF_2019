import makeRequest, { endPoints } from './constants';

const createProcessOrder = async ({ companyID,companyKey, list }) => {
  await makeRequest({
    method: 'POST',
    endPoint: endPoints.goodsReceipt+"/"+companyKey,
    companyID,
    data: {
      list
    },
  });
};

export default createProcessOrder;
