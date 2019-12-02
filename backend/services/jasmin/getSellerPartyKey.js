import makeRequest, { endPoints, constants } from "./constants";

export const getSellerPartyKey = async ({ company, name }) => {
  const res = await makeRequest({
    method: "GET",
    endPoint: endPoints.sellerParties,
    company
  });

  try {
    const key = res.data.find(({ name: sName }) => name == sName);
    return key.partyKey;
  } catch (e) {
    return undefined;
  }
};

export const isSellerParty = async ({ company, key }) => {
  const res = await makeRequest({
    method: "GET",
    endPoint: `${endPoints.sellerParties}/${key}`,
    company
  });

  return res.status === 200;
};

