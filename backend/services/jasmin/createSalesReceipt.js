import makeRequest, { endPoints } from './constants';

const createSalesReceipt = ({
  companyID,
  documentType,
  serie,
  accountingParty,
  company,
  documentDate,
  postingDate,
  currency,
  exchangeRate,
  checkEndorsed,
  isPaymentMethodCheck,
  grossValue,
  payableAmount,
  wTaxTotal,
  taxTotal,
  taxExclusiveAmount,
  receiptLines,
  financialAccount,
}) => makeRequest({
  method: 'POST',
  endPoint: endPoints.receipts,
  data: {
    documentType,
    serie, ////INNVOICE
    accountingParty, //0001
    company, //FEUP
    documentDate,
    postingDate,
    currency, //INNVOICE
    exchangeRate, //invoice
    checkEndorsed, //false
    receiptLines, //INVOICE
    financialAccount,
  },
  companyID,
});

export default createSalesReceipt;
