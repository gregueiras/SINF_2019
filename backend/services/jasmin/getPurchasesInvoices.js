import makeRequest, { endPoints } from './constants';

export const getPurchasesInvoices = async ({ companyID }) => {
    const res = await makeRequest({
      method: 'GET',
      endPoint: endPoints.invoiceReceipt,
      companyID,
    });
    return res;
  };
  

export default getPurchasesInvoices;
