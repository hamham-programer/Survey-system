const {Router} = require("express")
const authController = require("./auth.controller")
const { Authorization } = require("../../common/guard/authorization.guard")
const { verifyPhoneNumber } = require("../../common/middleware/verifyPhoneNumber")
const router = Router()
router.post("/send-otp", authController.sendOTP)
router.post("/check-otp", authController.checkOTP)
router.post("/check-refresh-token", authController.checkRefreshToken);
router.get("/logout",authController.logOut)
router.post('/verify-phone', verifyPhoneNumber);

module.exports = {
    AuthRouter: router
}