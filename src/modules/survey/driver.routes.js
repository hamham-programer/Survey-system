const { Router } = require("express");
const { Authorization } = require("../../common/guard/authorization.guard");
const driverController = require("./driver.controller");

const router = Router();

// مسیر برای ایجاد راننده جدید
router.post("/", driverController.createDriver);
// مسیر برای دریافت لیست تمام راننده‌ها
router.get("/", driverController.getDrivers);
// مسیر برای حذف راننده
router.delete("/:id", driverController.deleteDriver);

// مسیر برای ایجاد مسیر رفت (مبدا)
router.post("/:id/outgoing-route", driverController.createOutgoingRoute);
// مسیر برای دریافت مسیر رفت (مبدا)
router.get("/:id/outgoing-route", driverController.getOutgoingRoutes);
// مسیر برای حذف مسیر رفت
router.delete("/:id/outgoing-route", driverController.deleteOutgoingRoute);

// مسیر برای ایجاد مسیر برگشت
router.post("/:id/return-route", driverController.createReturnRoute);
// مسیر برای دریافت مسیر برگشت
router.get("/:id/return-route", driverController.getReturnRoutes);
// مسیر برای حذف مسیر برگشت
router.delete("/:id/return-route", driverController.deleteReturnRoute);

module.exports = {
    DriverRoutes: router
};
