import api from "../configs/api";

const setCookie = (tokens) => {
    document.cookie = `accessToken=${tokens.accessToken}; max-age=${1 * 24 * 60 * 60}; path=/; secure; samesite=strict`;
    document.cookie = `refreshToken=${tokens.refreshToken}; max-age=${30 * 24 * 60 * 60}; path=/; secure; samesite=strict`;
};

const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;  
};

const getNewTokens = async () => {
    const refreshToken = getCookie("refreshToken")
    if(!refreshToken) return null
    try {
        const response = await api.post("auth/check-refresh-token", {refreshToken}, {withCredentials:true})
        console.log(response);
     return {response}
        
    } catch (error) {
        return {error}
        
    }
}


export {setCookie, getCookie, getNewTokens}