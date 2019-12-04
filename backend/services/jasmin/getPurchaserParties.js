import makeRequest, { endPoints } from "./constants";


export const getPurchaserParties = async ( {company} ) => {
  const res = await makeRequest({
    method: "GET",
    endPoint: endPoints.purchaserParties,
    company
  });
  return res;
};
