import axios from "axios";

const getCorrespondence = async ({ companyA, companyB, product }) => {
  const req = await axios.get(
    `http://0.0.0.0:3335/product/${companyA}/${companyB}/${product}`
  );

  console.log(`http://0.0.0.0:3335/product/${companyA}/${companyB}/${product}`);
  const { data } = req;
  console.log(data)
  const { id_company_b } = data;
  console.log(id_company_b)

  return id_company_b;
};

export default getCorrespondence;
