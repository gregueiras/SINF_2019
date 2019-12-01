import makeRequest, { endPoints, constants } from './constants';

function getCompany(companyId) {
  if(companyId === 'intercompany')
    return constants.intercompany;
  if(companyId === 'feup')
    return constants.feup;
  if(companyId === 'ritaNorinho')
    return constants.ritaNorinho;
  return constants.intercompany;
}

const getItems = (page, pageSize, companyId) => 
   makeRequest({
    method: 'GET',
    endPoint: endPoints.items,
    company: getCompany(companyId),
    query: {
      page,
      pageSize,
    },
  });


export default getItems;
