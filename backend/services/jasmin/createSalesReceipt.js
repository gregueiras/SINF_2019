import makeRequest, { endPoints } from './constants';

const createSalesReceipt = ({
  companyID,
  documentType,
  serie,
  seriesNumber,
  accountingParty,
  company,
  documentDate,
  postingDate,
  currency,
  exchangeRate,
  checkEndorsed,
  isPaymentMethodCheck,
  allowanceChargeAmount,
  grossValue,
  payableAmount,
  wTaxTotal,
  taxTotal,
  taxExclusiveAmount,
  receiptLines,
}) => makeRequest({
  method: 'POST',
  endPoint: endPoints.receipts,
  data: {
    documentType,
    serie, ////INNVOICE
    seriesNumber, ////INNVOICE
    accountingParty,
    company,
    documentDate,
    postingDate,
    currency, //INNVOICE
    exchangeRate, //invoice
    checkEndorsed,
    isPaymentMethodCheck,
    allowanceChargeAmount, //INNVOICE
    grossValue, //INNVOICE
    payableAmount, //INNVOICE
    wTaxTotal, //INNVOICE
    taxTotal,  //INVOICE
    taxExclusiveAmount, //invoice
    receiptLines, //INVOICE
  },
  companyID,
});

export default createSalesReceipt;
