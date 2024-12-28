const DriverModel = require("./driver.model");
const { OutgoingRouteModel, ReturnRouteModel } = require("./route.model");
const autoBind = require("auto-bind");

class AdminController {
  constructor() {
    autoBind(this);
  }

  // ایجاد راننده جدید
  async createDriver(req, res, next) {
    const { name } = req.body;

    try {
      const createdDriver = await DriverModel.create({ name });
      res.status(201).json({ message: "نام راننده با موفقیت ایجاد شد", driver: createdDriver });
    } catch (error) {
      console.error(error);
      next({ message: "خطا در ایجاد نام راننده", error });
    }
  }
  async deleteDriver(req, res, next) {
    const { id } = req.params;
  
    try {
      await DriverModel.findByIdAndDelete(id);
      res.status(200).json({ message: "راننده با موفقیت حذف شد" });
    } catch (error) {
      console.error(error);
      next({ message: "خطا در حذف راننده", error });
    }
  }
  
  // دریافت راننده‌ها
  async getDrivers(req, res, next) {
    try {
      const drivers = await DriverModel.find();
      res.status(200).json(drivers);
    } catch (error) {
      console.error(error);
      next({ message: "خطا در دریافت رانندگان", error });
    }
  }

  // ایجاد مسیر رفت
  async createOutgoingRoute(req, res, next) {
    const { start } = req.body;

    try {
      const createdRoute = await OutgoingRouteModel.create({ start });
      res.status(201).json({ message: "مسیر رفت با موفقیت ایجاد شد", route: createdRoute });
    } catch (error) {
      console.error(error);
      next({ message: "خطا در ایجاد مسیر رفت", error });
    }
  }
// حذف مسیر رفت
async deleteOutgoingRoute(req, res, next) {
    const { id } = req.params;
  
    try {
      await OutgoingRouteModel.findByIdAndDelete(id);
      res.status(200).json({ message: "مسیر رفت با موفقیت حذف شد" });
    } catch (error) {
      console.error(error);
      next({ message: "خطا در حذف مسیر رفت", error });
    }
  }
    // دریافت مسیرهای رفت
    async getOutgoingRoutes(req, res, next) {
        try {
          const routes = await OutgoingRouteModel.find();
          res.status(200).json(routes);
        } catch (error) {
          console.error(error);
          next({ message: "خطا در دریافت مسیرهای رفت", error });
        }
      }
  // ایجاد مسیر برگشت
  async createReturnRoute(req, res, next) {
    const { end } = req.body;

    try {
      const createdRoute = await ReturnRouteModel.create({ end });
      res.status(201).json({ message: "مسیر برگشت با موفقیت ایجاد شد", route: createdRoute });
    } catch (error) {
      console.error(error);
      next({ message: "خطا در ایجاد مسیر برگشت", error });
    }
  }
  // حذف مسیر برگشت
async deleteReturnRoute(req, res, next) {
    const { id } = req.params;
  
    try {
      await ReturnRouteModel.findByIdAndDelete(id);
      res.status(200).json({ message: "مسیر برگشت با موفقیت حذف شد" });
    } catch (error) {
      console.error(error);
      next({ message: "خطا در حذف مسیر برگشت", error });
    }
  }


  // دریافت مسیرهای برگشت
  async getReturnRoutes(req, res, next) {
    try {
      const routes = await ReturnRouteModel.find();
      res.status(200).json(routes);
    } catch (error) {
      console.error(error);
      next({ message: "خطا در دریافت مسیرهای برگشت", error });
    }
  }
}

module.exports = new AdminController();
