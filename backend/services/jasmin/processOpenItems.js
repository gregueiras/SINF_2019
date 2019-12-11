import makeRequest, { endPoints } from './constants';

const processOpenItems = ({
    sourceDoc,
    discount,
    settled,
    companyKey,
    companyID,
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
});

export default processOpenItems;
