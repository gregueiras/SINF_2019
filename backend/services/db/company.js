import axios from 'axios';

export const getCompany = async (id) => {
  const req = await axios.get(`http://0.0.0.0:3335/company/${id}`);
  
  const { data } = req;
  
  return data;
};

export const fetchToken = async (id) => {
  const url = `http://0.0.0.0:3335/company/${id}/token`;
  const req = await axios.get(url);

  const { data } = req;

  return data;
};

export const storeToken = ({ companyID, token, expires }) => axios.post(`http://0.0.0.0:3335/company/token`, {
  companyID,
  token,
  expires,
});
