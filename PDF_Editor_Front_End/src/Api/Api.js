import axios from "axios";
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL_NETWORK });

API.interceptors.request.use((req) => {
  // You can add additional logic here, such as attaching tokens
  return req;
});

export default API;
