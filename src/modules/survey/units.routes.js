const { Router } = require("express");
const { Authorization } = require("../../common/guard/authorization.guard");
const unitController = require("./units.controller");

const router = Router();

// مسیر برای ایجاد واحد جدید
router.post("/", unitController.createUnit);

// مسیر برای دریافت لیست تمام واحدها
router.get("/", unitController.getUnits);

// مسیر برای دریافت یک واحد خاص بر اساس ID
router.get("/:id", unitController.getUnitById);

// مسیر برای به‌روزرسانی یک واحد
router.put("/:id", Authorization, unitController.updateUnit);

// مسیر برای حذف یک واحد
router.delete("/:id", Authorization, unitController.deleteUnit);

module.exports = {
    UnitRoutes: router
};
