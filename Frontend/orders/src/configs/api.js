import axios from "axios";
import { getCookie, getNewTokens, setCookie } from "../utils/cookie";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use(
    (request) => {
        const accessToken = getCookie("accessToken");
        if (accessToken) {
            request.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);
 
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
        
            const res = await getNewTokens();
            if (!res?.response) return Promise.reject(error);
        
            setCookie(res.response.data);
        
          
            return api(originalRequest);
        }
        
        return Promise.reject(error);
    }
); 


export default api;