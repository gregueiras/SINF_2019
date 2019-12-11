import makeRequest, { endPoints } from './constants';

export const getCompanyName = async ({ companyID }) => {
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

export const getCompanyKey = async ({ companyID }) => {
  const res = await makeRequest({
    method: 'GET',
    endPoint: endPoints.companies,
    companyID,
  });

  const comp = res.data.find(
    ({ isActive, isSystem, isDeleted }) => isActive && !isSystem && !isDeleted,
  );
  return comp.companyKey;
};
