import axios from "axios";
const API = axios.create({ baseURL: 'https://apipdfcollaborator.shubham09anand.in/auth' });
// const API = axios.create({ baseURL: 'http://13.202.210.238:8081/auth' });
// const API = axios.create({ baseURL: 'http://127.0.0.1:8080/auth' });

API.interceptors.request.use((req) => {
  return req;
});

export default API;
