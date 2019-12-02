import makeRequest, { endPoints } from "./constants";

const getCompanyName = async ({ company }) => {

  const res = await makeRequest({
    method: "GET",
    endPoint: endPoints.companies,
    company,
  });

  const comp = res.data.find(
    ({ isActive, isSystem, isDeleted }) => isActive && !isSystem && !isDeleted
  );
  return comp.name;
}

export default getCompanyName;
