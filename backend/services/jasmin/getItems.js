import makeRequest, { endPoints, constants } from './constants';

//TODO GET FROM DB
function getCompany(companyId) {
  if(companyId === '1')
    return constants.intercompany;
  if(companyId === '2')
    return constants.feup;
  if(companyId === '3')
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
