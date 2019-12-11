import axios from 'axios';

export const getSellerParty = async ({ companyA, companyB }) => {
  const req = await axios.get(`http://0.0.0.0:3335/entity/${companyA}/${companyB}`);

  const { data } = req;
  const { id_company_a } = data;
  return id_company_a;
};

export const getCustomerParty = async ({ companyA, companyB }) => {
  const req = await axios.get(`http://0.0.0.0:3335/entity/${companyA}/${companyB}`);

  const { data } = req;
  const { id_company_b } = data;
  return id_company_b;
};
