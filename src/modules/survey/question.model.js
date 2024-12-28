const { Schema, Types, model } = require("mongoose");

const QuestionSchema = new Schema(
  {
    text: { type: String, required: true },
    surveyId: { type: Types.ObjectId, ref: "Survey", required: true }, // لینک به نظرسنجی
    type: { type: String, enum: ['multiple-choice', 'text', 'driver-route'], required: true }, // نوع سوال
    options: [{ type: String }], // گزینه‌ها برای سوالات چندگزینه‌ای
    driverId: { type: Types.ObjectId, ref: "Driver" }, // افزودن فیلد مربوط به راننده
    returnDriverId: { type: Schema.Types.ObjectId, ref: 'Driver', default: null },
    routeId: { type: Types.ObjectId, ref: "Route" }, // افزودن فیلد مربوط به مسیر رفت
    outgoingRouteId: { type: Schema.Types.ObjectId, ref: 'Route', default: null },
    returnRouteId: { type: Schema.Types.ObjectId, ref: 'Route', default: null }
  },
  {
    timestamps: true,
  }
);

const QuestionModel = model("Question", QuestionSchema);
module.exports = QuestionModel;
