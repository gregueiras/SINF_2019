import axios from "axios";

const getUsers = () => {
  return axios.get('http://0.0.0.0:3335/user');
}

export default getUsers;
