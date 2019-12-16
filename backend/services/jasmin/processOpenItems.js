import makeRequest, { endPoints } from './constants';

const processOpenItems = ({
    sourceDoc,
    discount,
    settled,
    companyKey,
    companyID,
    processID,
}) => makeRequest({
  method: 'POST',
  endPoint: endPoints.receivebleOpenItems + "/" + companyKey,
  data:
     [
        {
            sourceDoc,
            discount,
            settled,
        }
    ]
  ,
  companyID,
  description: "Process Open Items",
  processID,
  doc:"SR",
});

export default processOpenItems;
