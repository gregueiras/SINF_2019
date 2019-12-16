import makeRequest, { endPoints } from './constants';

export const getCompanyName = async ({ companyID, processID }) => {
  const res = await makeRequest({
    method: 'GET',
    endPoint: endPoints.companies,
    companyID,
    processID,
    description:"Get Company Name",

  });

  const comp = res.data.find(
    ({ isActive, isSystem, isDeleted }) => isActive && !isSystem && !isDeleted,
  );
  return comp.name;
};

export const getCompanyKey = async ({ companyID, processID }) => {
  const res = await makeRequest({
    method: 'GET',
    endPoint: endPoints.companies,
    companyID,
    processID,
    description:"Get Company Key",
  });

  const comp = res.data.find(
    ({ isActive, isSystem, isDeleted }) => isActive && !isSystem && !isDeleted,
  );
  return comp.companyKey;
};
