import makeRequest, { endPoints } from './constants';

const createProcessOrder =  ({ companyID,sourceDocKey,sourceDocLineNumber, quantity, companyKey}) => 
   makeRequest({
    method: 'POST',
    endPoint: endPoints.goodsReceipt+"/"+companyKey,
    companyID,
    data: [
      {
      SourceDocKey: sourceDocKey,
      SourceDocLineNumber: sourceDocLineNumber,
      quantity
    }]
  });

export default createProcessOrder;
