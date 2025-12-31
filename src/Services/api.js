import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((req)=>{
    const auth=JSON.parse(localStorage.getItem("auth"));

    if(auth?.token){
        req.headers.Authorization=`Bearer ${auth.token}`
    }
      return req;
})

export default api;