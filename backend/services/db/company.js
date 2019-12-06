import axios from "axios";

const getCompany = async (id) => {
  const req = await axios.get(`http://0.0.0.0:3335/company/${id}`);

  const { data } = req;

  return data;
};

export default getCompany