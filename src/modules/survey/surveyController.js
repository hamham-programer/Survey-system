const autoBind = require("auto-bind");
const SurveyModel = require("./survey.model");
const QuestionModel = require("./question.model");
const createHttpError = require("http-errors");
const mongoose = require('mongoose');
const { Types } = mongoose; // Import Types

class SurveyController {
    constructor() {
        autoBind(this);
    }

  async create(req, res, next) {
    try {
        const { title, description, questions, driverName, route, isRestricted, allowedUnits, surveyType } = req.body;

        const userId = req.user._id;
        const allowedUnitsObjectIds = allowedUnits.map(unit => new Types.ObjectId(unit));

        const surveyData = {
            title,
            description,
            questions,
            user: userId,
            isRestricted,
            allowedUnits: allowedUnitsObjectIds,
            surveyType,
        };

        if (driverName && driverName.trim()) {
            surveyData.driverName = driverName;
        }
        if (route && route.trim()) {
            surveyData.route = route;
        }

        const createdSurvey = await SurveyModel.create(surveyData);

        if (surveyType === 'driver') {
            // حالا سوالات مربوط به راننده را ایجاد کنیم
            for (const question of questions) {
                if (question.type === 'driver-route') {
                    // سوالات مربوط به راننده و مسیر را ایجاد کنید
                    const outgoingDriverName = question.outgoingDriverName; // فرض بر این است که نام راننده در سوال موجود است
                    const returnDriverName = question.returnDriverName; // فرض بر این است که نام راننده در سوال موجود است
                    const driverRouteQuestions = [
                        { text: `راننده رفت: ${outgoingDriverName}`, surveyId: createdSurvey._id, type: 'text' },
                        { text: `راننده برگشت: ${returnDriverName}`, surveyId: createdSurvey._id, type: 'text' },
                    ];

                    for (const driverRouteQuestion of driverRouteQuestions) {
                        const createdQuestion = await QuestionModel.create(driverRouteQuestion);
                        createdSurvey.questions.push(createdQuestion._id);
                    }
                }
            }
        }

        await createdSurvey.save();
        res.json({ message: "نظرسنجی با موفقیت ایجاد شد", survey: createdSurvey });
    } catch (error) {
        console.error("Error in createSurvey API:", error.response?.data || error.message);
        next(error);
    }
}

    async getSurveys(req, res, next) {
        try {
            const surveys = await SurveyModel.find();
            res.json({ surveys });
        } catch (error) {
            next(error);
        }
    }

    async getSurvey(req, res, next) {
        try {
            const { id } = req.params;
            const survey = await SurveyModel.findById(id).populate("questions");
            if (!survey) throw createHttpError.NotFound("Survey not found");
            res.json({ survey });
        } catch (error) {
            next(error);
        }
    }
    async getSurveysByDriverAndRoute(req, res, next) {
        try {
            const { driverName, route } = req.params;
            const surveys = await SurveyModel.find({ driverName, route });
            res.json({ surveys });
        } catch (error) {
            next(error);
        }
    }
    

    async deleteSurvey(req, res, next) {
        try {
            const { id } = req.params;
            await SurveyModel.findByIdAndDelete(id);
            res.json({ message: "Survey deleted successfully" });
        } catch (error) {
            next(error);
        }
    }
    async getUnits(req, res, next) {
        try {
            const units = await UserModel.distinct("organization"); // دریافت لیست واحدها
            res.json({ units });
        } catch (error) {
            next(error);
        }
    }
}


module.exports = new SurveyController();
