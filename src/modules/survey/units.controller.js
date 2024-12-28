const autoBind = require("auto-bind");
const UnitModel = require("./units.model");

class UnitController {
  constructor() {
    autoBind(this);
  }

  // ایجاد واحد جدید
  async createUnit(req, res) {
    const { workLocation, organization } = req.body;

    const newUnit = new UnitModel({
      workLocation,
      organization, 
    });

    try {
      const savedUnit = await newUnit.save();
      res.status(201).json(savedUnit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "خطا در ایجاد واحد" });
    }
  }

  // دریافت لیست تمام واحدها
  async getUnits(req, res) {
    try {
      const units = await UnitModel.find();
      res.status(200).json(units);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "خطا در دریافت واحدها" });
    }
  }

  // دریافت واحد بر اساس ID
  async getUnitById(req, res) {
    const { id } = req.params;

    try {
      const unit = await UnitModel.findById(id);
      if (!unit) {
        return res.status(404).json({ message: "واحد پیدا نشد" });
      }
      res.status(200).json(unit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "خطا در دریافت واحد" });
    }
  }

  // به‌روزرسانی واحد
  async updateUnit(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const updatedUnit = await UnitModel.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedUnit) {
        return res.status(404).json({ message: "واحد پیدا نشد" });
      }
      res.status(200).json(updatedUnit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "خطا در به‌روزرسانی واحد" });
    }
  }

  // حذف واحد
  async deleteUnit(req, res) {
    const { id } = req.params;

    try {
      const deletedUnit = await UnitModel.findByIdAndDelete(id);
      if (!deletedUnit) {
        return res.status(404).json({ message: "واحد پیدا نشد" });
      }
      res.status(204).json(); // بدون محتوا
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "خطا در حذف واحد" });
    }
  }
}

module.exports = new UnitController();
