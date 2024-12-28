const { Schema, Types, model } = require("mongoose");

const SurveySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    user: { type: Types.ObjectId, ref: "User" },
    questions: [{ type: Types.ObjectId, ref: "Question" }],
    driverName: { type: String, required: false },
    route: { type: String, required: false }, 
    isRestricted: { type: Boolean, default: false },
    allowedUnits: [{ type: Types.ObjectId, ref: 'Unit' }],
    surveyType: { type: String, enum: ['normal', 'driver'], default: 'normal' } 

  },
  {
    timestamps: true,
  }
);

const SurveyModel = model("Survey", SurveySchema);
module.exports = SurveyModel;
