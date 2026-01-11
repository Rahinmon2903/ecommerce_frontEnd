import axios from "axios";

export const api = axios.create({
    baseURL: "https://ecommerce-backend-4-wys7.onrender.com/api",
});

api.interceptors.request.use((req)=>{
    const auth=JSON.parse(localStorage.getItem("auth"));

    if(auth?.token){
        req.headers.Authorization=`Bearer ${auth.token}`
    }
      return req;
})

export default api;