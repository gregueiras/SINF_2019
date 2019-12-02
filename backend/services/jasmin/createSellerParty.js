import makeRequest, { endPoints } from "./constants";
import { getSellerPartyKey } from "./getSellerPartyKey";

const createSellerParty = async ({ company, name }) => {
  await makeRequest({
    method: "POST",
    endPoint: endPoints.sellerParties,
    company,
    data: {
      name,
      currency: "EUR",
      country: "PT",
    }
  });

  const key = await getSellerPartyKey({ company, name });
  return key;
};

export default createSellerParty;
