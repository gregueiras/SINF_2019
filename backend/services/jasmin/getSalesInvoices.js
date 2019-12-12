import makeRequest, { endPoints } from './constants';



export const getSalesInvoices = async ({ companyID, processID }) => {
    const res = await makeRequest({
      method: 'GET',
      endPoint: endPoints.billingInvoices,
      companyID,
      description:"Get Sales Invoices",
      processID,
    });
    return res;
  };
  

export default getSalesInvoices;
