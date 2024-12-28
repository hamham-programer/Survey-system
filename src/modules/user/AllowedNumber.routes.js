const { Router } = require("express");
const allowedNumberController = require("./AllowedNumber.controller"); 
const verifyAdmin = require("../../common/guard/verify.guard"); 
const router = Router();

// مسیر برای افزودن شماره مجاز
router.post("/", allowedNumberController.addAllowedNumber);

// مسیر برای حذف شماره مجاز
router.delete("/:phoneNumber", allowedNumberController.removeAllowedNumber);

// مسیر برای دریافت همه شماره‌های مجاز
router.get("/", allowedNumberController.getAllAllowedNumbers);

module.exports = {
    AllowedNumberRouter: router
};
