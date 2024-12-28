const autoBind = require("auto-bind");
const AllowedNumber = require("./AllowedNumber.model");
class AllowedNumberController {
    constructor() {
        autoBind(this);
    }

    async addAllowedNumber(req, res, next) {
        try {
            const { phoneNumber } = req.body;         
            const existingNumber = await AllowedNumber.findOne({ phoneNumber });
            if (existingNumber) {
                return res.status(400).json({ message: "این شماره قبلاً اضافه شده است." });
            }

            const newNumber = new AllowedNumber({ phoneNumber });
            await newNumber.save();

            return res.status(201).json({ message: "شماره با موفقیت اضافه شد.", phoneNumber });
        } catch (error) {
            next(error);
        }
    }

    // متد حذف شماره مجاز
    async removeAllowedNumber(req, res, next) {
        try {
            const { phoneNumber } = req.params;

            const deletedNumber = await AllowedNumber.findOneAndDelete({ phoneNumber });
            if (!deletedNumber) {
                return res.status(404).json({ message: "شماره مورد نظر یافت نشد." });
            }

            return res.status(200).json({ message: "شماره با موفقیت حذف شد." });
        } catch (error) {
            next(error);
        }
    }

    // متد گرفتن همه شماره‌های مجاز
    async getAllAllowedNumbers(req, res, next) {
        try {
            const allowedNumbers = await AllowedNumber.find({});        
            return res.status(200).json({ allowedNumbers });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AllowedNumberController();
