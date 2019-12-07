import makeRequest, { endPoints } from './constants';

const getCompanyName = async ({ companyID }) => {
  const res = await makeRequest({
    method: 'GET',
    endPoint: endPoints.companies,
    companyID,
  });

  const comp = res.data.find(
    ({ isActive, isSystem, isDeleted }) => isActive && !isSystem && !isDeleted,
  );
  return comp.name;
};

export default getCompanyName;
