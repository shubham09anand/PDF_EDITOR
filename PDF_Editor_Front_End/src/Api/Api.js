import axios from "axios";
const API = axios.create({ baseURL: 'https://apipdfcollaborator.shubham09anand.in' });
// const API = axios.create({ baseURL: 'http://13.202.210.238:8081/auth' });

API.interceptors.request.use((req) => {
  return req;
});

export default API;
