const autoBind = require("auto-bind")
const authService = require("./auth.service")
const AuthMessage = require("./auth.message")
const CookieNames = require("../../common/constant/cookie.enum")
const NodeEnv = require("../../common/constant/env.enum")
class AuthController{
    #service
    constructor(){
        autoBind(this)
        this.#service = authService
    }

    async sendOTP(req, res, next) {
        try {
            const {mobile} = req.body            
             await this.#service.sendOTP(mobile)
            return res.json({
                message: AuthMessage.SendOtoSuccessfully
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                message: "ارسال کد صورت نگرفت",
                error: error.message
            })
            
        }
    }
async checkOTP(req, res, next) {
    try {
        const { mobile, code } = req.body;
        const { accessToken, refreshToken } = await this.#service.checkOTP(mobile, code);
        
        // ذخیره accessToken در کوکی
        res.cookie(CookieNames.AccessToken, accessToken, {
            httpOnly: false,
            secure: process.env.Node_Env === NodeEnv.Production,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // یک روز
        });
        
        // ذخیره refreshToken در کوکی
        res.cookie(CookieNames.RefreshToken, refreshToken, {
            httpOnly: false,
            secure: process.env.Node_Env === NodeEnv.Production,
            sameSite: 'strict',
            /* maxAge: 30 * 24 * 60 * 60 * 1000 // سی روز */
            maxAge: 0
        });

        return res.status(200).json({
            message: AuthMessage.LoginSuccessfully,
            accessToken,
            refreshToken
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            message: "ورود ناموفق بود",
            error: error.message
        });
    }
}

    async checkRefreshToken (req, res, next) {
        try {
            const {refreshToken: token} = req.body;
            const {accessToken, refreshToken} = await this.#service.checkRefreshToken(token);
            return res.status(200).json({
                message: AuthMessage.LoginSuccessfully,
                accessToken,
                refreshToken
            });
        } catch (error) {
            next(error);
        }
    }
    async logOut(req, res, next) {
        try {
            res.clearCookie(CookieNames.AccessToken);
            res.clearCookie(CookieNames.RefreshToken);
            
            return res.status(200).json({
                message: AuthMessage.LogoutSuccessfuly
            });
            
        } catch (error) {
            next(error);
        }
    }
    
}
module.exports = new AuthController()