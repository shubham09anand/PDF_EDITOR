import axios from "axios";
const API = axios.create({baseURL: "http://127.0.0.1:8080/auth"});
console.log(process.env.REACT_BASE_URL)

API.interceptors.request.use((req)=>{
     return req;
});

export default API;