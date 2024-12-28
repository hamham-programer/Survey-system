import api from "../configs/api"
const getProfile = () => api.get("user/whoami", {withCredentials:true})
const getPost = () => api.get("post/my", {withCredentials:true})
const getAllPost = () => api.get("", {withCredentials:true})
const logOut = () => api.get("/auth/logout", { withCredentials: true });

// تابع برای افزودن شماره مجاز
const addAllowedNumber = (phoneNumber) => api.post("AllowedNumber", { phoneNumber }, { withCredentials: true });

// تابع برای حذف شماره مجاز
const removeAllowedNumber = (phoneNumber) => api.delete(`AllowedNumber/${phoneNumber}`, { withCredentials: true });

// تابع برای گرفتن همه شماره‌های مجاز
const getAllAllowedNumbers = async() => {
    try {
       const response = await api.get("AllowedNumber", { withCredentials: true });
       return response
    } catch (error) {
        console.error("Error fetching allowed numbers:", error);

        
    }
}

export {getProfile, getPost, getAllPost, logOut,addAllowedNumber, removeAllowedNumber, getAllAllowedNumbers }