import makeRequest, { endPoints } from './constants';

export const getOpenItems = ({ 
    companyID, page, pageSize, company, documentDate, documentExchangeRate, party, currency, documentType}) => makeRequest({
  method: 'GET',
  endPoint: endPoints.openItems + "/" + page + "/" + pageSize,
  companyID,
  query: {
    company, //FEUP-GX
    documentDate, //2029-12-08
    documentExchangeRate, //1.00000000
    party,  //0007
    currency, //EUR
    documentType //PAG
  },
});


