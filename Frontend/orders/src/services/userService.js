import api from "../configs/api";

// دریافت همه کاربران
const getAllUsers = async () => {
    try {
        const response = await api.get("user/users", {
            withCredentials: true 
        });
        console.log(response);
        
        return { response };
    } catch (error) {
        console.error('Error fetching users:', error); // اضافه کردن لاگ خطا
        return { error };
    }
};

// به‌روزرسانی پروفایل کاربر
const updateProfile = async (data) => {
    try {
        const response = await api.put("user/profile", data, {
            withCredentials: true // اضافه کردن credentials به درخواست
        });
        return { response };
    } catch (error) {
        return { error };
    }
};

// به‌روزرسانی پروفایل کاربر توسط ادمین
const updateUserByAdmin = async (userId, data) => {
    try {
        const response = await api.put(`user/users/${userId}`, data, {
            withCredentials: true // اضافه کردن credentials به درخواست
        });
        return { response };
    } catch (error) {
        return { error };
    }
};

// دریافت اطلاعات یک کاربر بر اساس ID
const getUserById = async (userId) => {
    try {
        const response = await api.get(`user/users/${userId}`, {
            withCredentials: true // اضافه کردن credentials به درخواست
        });
        return { response };
    } catch (error) {
        return { error };
    }
};

 const checkProfile = async () => {
    try {
        const response = await api.get('user/check-profile', {
            withCredentials: true
        });
        return { response: response.data};
    } catch (error) {
        console.error("Failed to check profile", error);
        return { error };
    }
};


export { getAllUsers, updateProfile, updateUserByAdmin, getUserById, checkProfile};
