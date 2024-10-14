import axios from "axios";
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL_NETWORK });
// const API = axios.create({ baseURL: 'http://13.202.210.238:8081/auth' });

API.interceptors.request.use((req) => {
  return req;
});

export default API;
