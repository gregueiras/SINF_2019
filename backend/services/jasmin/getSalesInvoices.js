import makeRequest, { endPoints } from './constants';



export const getSalesInvoices = async ({ companyID }) => {
    const res = await makeRequest({
      method: 'GET',
      endPoint: endPoints.billingInvoices,
      companyID,
    });
    return res;
  };
  

export default getSalesInvoices;
