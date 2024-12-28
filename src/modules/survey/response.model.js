const { Schema, Types, model } = require("mongoose");

const ResponseSchema = new Schema(
  {
    surveyId: { type: Types.ObjectId, ref: "Survey", required: true }, // لینک به نظرسنجی
    userId: { type: Types.ObjectId, ref: "User", required: true }, // لینک به کاربر
    answers: [
      {
        questionId: { type: Types.ObjectId, ref: "Question", required: true }, // لینک به سوال
        answer: { type: Schema.Types.Mixed, required: true }, // پاسخ به سوال (می‌تواند رشته، عدد، یا گزینه انتخابی باشد)
        answerType: { type: String, enum: ['multiple-choice', 'text', 'driver-route'], required: true }, // نوع پاسخ
        driverId: { type: Types.ObjectId, ref: "Driver" },

      },
    ],
    driverInfo: {  // اضافه کردن فیلد اطلاعات راننده‌ها
      outgoingDriver: String,
      returnDriver: String,
    },
  },
  {
    timestamps: true,
  }
);

const ResponseModel = model("Response", ResponseSchema);
module.exports = ResponseModel;
