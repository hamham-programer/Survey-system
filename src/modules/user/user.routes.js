const { Router } = require("express");
const userController = require("./user.controller");
const verifyAdmin = require("../../common/guard/verify.guard");
const router = Router();

// مسیر برای دریافت پروفایل کاربر فعلی
router.get("/whoami", userController.whoami);

// مسیر برای به‌روزرسانی پروفایل کاربر فعلی (فقط یک بار مجاز است)
router.put("/profile", userController.updateProfile);

// مسیر برای چک کردن وضعیت کاربر)
router.get("/check-profile", userController.checkProfile);

// مسیر برای به‌روزرسانی پروفایل هر کاربر توسط ادمین
router.put("/profile/:userId", verifyAdmin, userController.updateUserProfileByAdmin);

// مسیر برای دریافت لیست همه کاربران توسط ادمین
router.get('/users', verifyAdmin, userController.getAllUser);

// مسیر برای مشاهده اطلاعات یک کاربر خاص بر اساس ID توسط ادمین
router.get('/users/:id', verifyAdmin, userController.getUserById);

// مسیر برای به‌روزرسانی پروفایل یک کاربر بر اساس ID توسط ادمین
router.put('/users/:id', verifyAdmin, userController.updateUserProfileByAdmin);

module.exports = {
    UserRouter: router
}
