const autoBind = require("auto-bind");
const QuestionModel = require("./question.model");
const SurveyModel = require("./survey.model");
const createHttpError = require("http-errors");

class QuestionController {
    constructor() {
        autoBind(this);
    }

 // ایجاد سوال جدید
 async create(req, res, next) {
    try {
        const { text, surveyId, type, options, driverId, returnDriverId, outgoingRouteId, returnRouteId } = req.body;
       /*  console.log(req.body.driverId); // بررسی اینکه آیا driverId در req.body وجود دارد
        console.log("driverIdin backend:",driverId); */
        // بررسی اینکه نظرسنجی مرتبط وجود دارد یا خیر
        const survey = await SurveyModel.findById(surveyId);
        if (!survey) throw createHttpError.NotFound("Survey not found");

        // ایجاد سوال جدید با داده‌های راننده و مسیر در صورت نیاز
        const questionData = {
            text,
            surveyId,
            type,
            options: type === 'multiple-choice' ? options : [],
            driverId,
            
        /*     returnDriverId: type === 'driver-route' ? returnDriverId : null,
            outgoingRouteId: type === 'driver-route' ? outgoingRouteId : null,
            returnRouteId: type === 'driver-route' ? returnRouteId : null, */
        };

        const question = await QuestionModel.create(questionData);
        /* console.log(question); */
        
        survey.questions.push(question._id);
        
        await survey.save();
        res.status(201).json({ message: "Question created successfully", question });
    } catch (error) {
        console.error(error);
        next(error);
    }
}  
 
    // دریافت سوالات مرتبط با یک نظرسنجی
    async getQuestionsBySurvey(req, res, next) {
        try {
            const { surveyId } = req.params;
            const questions = await QuestionModel.find({ surveyId });
            res.json({ questions });
        } catch (error) {
            next(error);
        }
    }

    // دریافت یک سوال با آیدی خاص
    async getQuestionById(req, res, next) {
        try {
            const { id } = req.params;
            const question = await QuestionModel.findById(id);
            if (!question) throw createHttpError.NotFound("Question not found");
            res.json({ question });
        } catch (error) {
            next(error);
        }
    }

    // ویرایش سوال
    async updateQuestion(req, res, next) {
        try {
            const { id } = req.params;
            const { text, type, options } = req.body;
            
            // به‌روزرسانی سوال
            const updatedQuestion = await QuestionModel.findByIdAndUpdate(
                id, 
                { text, type, options: type === 'multiple-choice' ? options : [] }, 
                { new: true }
            );

            if (!updatedQuestion) throw createHttpError.NotFound("Question not found");

            res.json({ message: "Question updated successfully", question: updatedQuestion });
        } catch (error) {
            next(error);
        }
    }

    // حذف سوال
    async deleteQuestion(req, res, next) {
        try {
            const { id } = req.params;

            // حذف سوال
            const question = await QuestionModel.findByIdAndDelete(id);
            if (!question) throw createHttpError.NotFound("Question not found");

            // حذف سوال از نظرسنجی
            await SurveyModel.updateOne(
                { _id: question.surveyId },
                { $pull: { questions: id } }
            );

            res.json({ message: "Question deleted successfully" });
        } catch (error) {
            next(error);
        }
    }

    // دریافت گزینه‌های سوال با ID مشخص
    async getOptionsByQuestionId(req, res, next) {
        try {
            const { questionId } = req.params;
            const question = await QuestionModel.findById(questionId).select('options');
            console.log('Fetching options for question ID:', questionId);

            if (!question) throw createHttpError.NotFound("Question not found");
            res.status(200).json({ options: question.options });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new QuestionController();
