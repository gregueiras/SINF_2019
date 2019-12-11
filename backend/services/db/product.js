import axios from 'axios';

export const getCorrespondence = async ({ companyA, companyB, product }) => {
  const req = await axios.get(
    `http://0.0.0.0:3335/product/${companyA}/${companyB}/${product}`,
  );

  const { data } = req;
  const { id_company_b } = data;

  return id_company_b;
};

export const getCorrespondenceB = async ({ companyA, companyB, product }) => {
  const req = await axios.get(
    `http://0.0.0.0:3335/product/B/${companyA}/${companyB}/${product}`,
  );

  const { data } = req;
  const { id_company_a } = data;

  return id_company_a;
};

