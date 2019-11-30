import axios from "axios";
import FormData from "form-data";

const constants = {
  url: "https://my.jasminsoftware.com",
  tenant: "224900",
  organization: "224900-0001",
  grantType: "client_credentials",
  clientId: "FEUP-SINF",
  clientSecret: "92f0a4da-64ee-4449-99e4-f93df1038980",
  scope: "application"
};

export const endPoints = {
  salesOrders: "sales/orders",
  purchasesOrders: "purchases/orders",
  series: "businesscore/series",
  items: "businesscore/items"

};

const makeUrl = (endPoint, query) => {
  let url = `${constants.url}/api/${constants.tenant}/${constants.organization}/${endPoint}?`;

  if (query) {
    Object.keys(query).forEach(key => {
      if (query[key]) url += `${key}=${query[key]}&`;
    });
  }

  return url;
};

const getToken = async () => {
  const formData = new FormData();
  formData.append("grant_type", constants.grantType);
  formData.append("client_id", constants.clientId);
  formData.append("client_secret", constants.clientSecret);
  formData.append("scope", constants.scope);

  const { data } = await axios.post(
    "https://identity.primaverabss.com/connect/token",
    formData,
    {
      headers: {
        ...formData.getHeaders()
      }
    }
  );
  const { access_token } = data;

  return access_token;
};

const makeRequest = async ({ token, endPoint, method, data, query }) => {
  let myToken = token;
  if (!token) {
    myToken = await getToken();
  }

  const url = makeUrl(endPoint, query);

  return axios({
    method,
    url,
    data,
    headers: {
      Authorization: `Bearer ${myToken}`,
      "Content-Type": "application/json"
    }
  });
};

export default makeRequest;
