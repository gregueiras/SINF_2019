import makeRequest, { endPoints } from './constants';

export const getPayableOpenItems = ({ 
    companyID, page, pageSize, company, documentDate, documentExchangeRate, party, currency, documentType}) => makeRequest({
  method: 'GET',
  endPoint: endPoints.payableOpenItems + "/" + page + "/" + pageSize,
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


export const getReceivableOpenItems = ({ 
  companyID, page, pageSize, company, documentDate, documentExchangeRate, party, currency, documentType}) => makeRequest({
method: 'GET',
endPoint: endPoints.receivebleOpenItems + "/" + page + "/" + pageSize,
companyID,
query: {
  company, //FEUP
  documentDate, //2029-12-08
  documentExchangeRate, //1.00000000
  party,  //0001
  currency, //EUR
  documentType //FA
},
});


