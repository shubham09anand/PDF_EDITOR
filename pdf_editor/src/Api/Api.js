import axios from "axios";
// const API = axios.create({baseURL: "http://192.168.1.5:8080/auth"});
const API = axios.create({baseURL: "http://127.0.0.1:8080/auth"});

API.interceptors.request.use((req)=>{
     return req;
});

export default API;