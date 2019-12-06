import axios from 'axios';

const getCorrespondence = async ({ companyA, companyB, product }) => {
  const req = await axios.get(
    `http://0.0.0.0:3335/product/${companyA}/${companyB}/${product}`,
  );

  const { data } = req;
  const { id_company_b } = data;

  return id_company_b;
};

export default getCorrespondence;
