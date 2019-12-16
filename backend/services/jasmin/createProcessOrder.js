import makeRequest, { endPoints } from './constants';

const createProcessOrder =  ({ companyID,sourceDocKey,sourceDocLineNumber, quantity, companyKey, processID}) => 
   makeRequest({
    method: 'POST',
    endPoint: endPoints.goodsReceipt+"/"+companyKey,
    companyID,
    description: "Create Goods Receipt",
    processID,
    doc: "RG",
    data: [
      {
      SourceDocKey: sourceDocKey,
      SourceDocLineNumber: sourceDocLineNumber,
      quantity
    }]
  });

export default createProcessOrder;
