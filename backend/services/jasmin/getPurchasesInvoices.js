import makeRequest, { endPoints } from './constants';

export const getPurchasesInvoices = async ({ companyID, processID }) => {
    const res = await makeRequest({
      method: 'GET',
      endPoint: endPoints.invoiceReceipt,
      companyID,
      processID,
      description:"Get Purchases Invoices"
    });
    return res;
  };
  

export default getPurchasesInvoices;
