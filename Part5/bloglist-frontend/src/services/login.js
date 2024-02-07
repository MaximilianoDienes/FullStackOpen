import axios from "axios";
const baseUrl = "/api/login";

const login = async (userData) => {
  const result = await axios.post(baseUrl, userData);
  return result.data;
};

export default login;
