import axios from "axios";

export default token => {
  const baseURL =
    process.env.VUE_APP_BACKEND_API_URL || `http://localhost:3000`;
  if (token) {
    return axios.create({
      baseURL: baseURL,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return axios.create({
    baseURL: baseURL
  });
};
