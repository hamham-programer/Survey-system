import api from "../configs/api"

const sendOtp = async(mobile) => {
    try {
        const response = await api.post("auth/send-otp", {mobile:mobile},{
            withCredentials: true 
        }) 
        return {response}
        
    } catch (error) {
        
        return {error}
        
    }
} 
const chechOtp = async(mobile, code)=>{
    try {
        const response = await api.post("auth/check-otp", {mobile, code},{
            withCredentials: true 
        })
        return {response}
        
    } catch (error) {
        return {error}
    }
   
}
export {sendOtp, chechOtp}