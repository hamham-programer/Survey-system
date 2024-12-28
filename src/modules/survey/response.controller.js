const autoBind = require("auto-bind");
const SurveyModel = require("./survey.model");
const createHttpError = require("http-errors");
const ResponseModel = require("./response.model");

class ResponseController {
    constructor() {
        autoBind(this);
    }

    async submitResponse(req, res, next) {
        try {
            const { surveyId, answers, driverInfo, driverId  } = req.body;
            const userId = req.user ? req.user._id : null;
            const userUnit = req.user ? req.user.organization : null;
             console.log('User Object:', req.user);
            console.log('User ID:', userId);
            console.log('Survey ID:', surveyId);
            console.log('Answers:', answers); 

            console.log('User Unit in backend:', userUnit); 
 
            if (!userId || !userUnit) {
                return next(createHttpError(400, 'اطلاعات کاربر کامل نیست.'));
            }
            // بررسی وجود پاسخ قبلی برای همان کاربر و نظرسنجی
            const existingResponse = await ResponseModel.findOne({ surveyId, userId });
            if (existingResponse) {
                return res.status(400).json({ message: "شما قبلا به این نظرسنجی پاسخ داده‌اید." });
            }

            const survey = await SurveyModel.findById(surveyId);
            if (!survey) throw createHttpError.NotFound("Survey not found");
            
/*             console.log('Survey Allowed Units:', survey.allowedUnits.map(unit._id => unit.name));
 */           console.log('User Unit:', userUnit);


            // بررسی اینکه آیا واحد کاربر جزو واحدهای مجاز است یا نه
        if (!survey.allowedUnits.some(unit => unit.equals(userUnit))) { 
            return res.status(403).json({ message: "شما اجازه ورود به این نظرسنجی را ندارید زیرا واحد شما مجاز نیست." });
        }
            
            let formattedAnswers;
            try {
                if (!Array.isArray(answers)) {
                    throw createHttpError.BadRequest("Answers should be an array");
                }
                formattedAnswers = answers;
            } catch (error) {
                console.error('Parsing Error:', error);
                throw createHttpError.BadRequest("Invalid JSON format for answers");
            }

            // بررسی اینکه آیا پاسخ‌ها با سوالات نظرسنجی مرتبط هستند
            const questionIds = survey.questions.map(q => q.toString());
            if (!formattedAnswers.every(answer => questionIds.includes(answer.questionId))) {
                throw createHttpError.BadRequest("Some answers do not match survey questions");
            }

            const response = await ResponseModel.create({
                surveyId,
                userId,
                answers: formattedAnswers.map(answer => ({
                    questionId: answer.questionId,
                    answer: answer.answer,
                    answerType: answer.answerType,
                    driverId: answer.driverId
                })),
                driverInfo,
            });
            console.log("Response saved successfully:", response);
            res.json({ message: "Response submitted successfully", response });
        } catch (error) {
            console.error("Error saving response:", error);
            next(error);
        }
    }

    async getResponses(req, res, next) {
        try {
            const { surveyId } = req.query;
            const responses = await ResponseModel.find({ surveyId }).populate("user").populate('answers.questionId');
            res.json({ responses });
        } catch (error) {
            next(error);
        }
    }

    async getSurveyAnalysis(req, res, next) {
        try {
            const { surveyId } = req.params;

            // دریافت پاسخ‌ها برای نظرسنجی
            const responses = await ResponseModel.find({ surveyId }).populate('answers.questionId');
            
            // تعداد کل شرکت‌کنندگان
            const totalParticipants = responses.length;

            // استخراج اطلاعات سوالات نظرسنجی
            const survey = await SurveyModel.findById(surveyId).populate('questions');
            if (!survey) throw createHttpError.NotFound("Survey not found");

            // تجزیه و تحلیل پاسخ‌ها برای هر سوال
            const analysis = survey.questions.map(question => {
                // فیلتر کردن پاسخ‌های مربوط به این سوال
                const totalResponses = responses.filter(response => response.answers.some(answer => answer.questionId.equals(question._id)));

                // اگر نوع سوال چندگزینه‌ای باشد
                if (question.type === 'multiple-choice') {
                    // شمارش تعداد پاسخ‌ها برای هر گزینه
                    const optionCounts = {};
                    question.options.forEach(option => {
                        optionCounts[option] = 0; // مقدار اولیه برای هر گزینه
                    });

                    totalResponses.forEach(response => {
                        const answer = response.answers.find(a => a.questionId.equals(question._id));
                        if (answer && optionCounts[answer.answer] !== undefined) {
                            optionCounts[answer.answer]++; // افزایش شمارش برای گزینه انتخاب شده
                        }
                    });

                    // محاسبه درصد پاسخ‌ها برای هر گزینه
                    const optionPercentages = {};
                    Object.keys(optionCounts).forEach(option => {
                        optionPercentages[option] = (optionCounts[option] / totalParticipants) * 100;
                    });

                    return {
                        questionText: question.text,
                        type: 'multiple-choice',
                        options: question.options,
                        optionCounts,
                        optionPercentages
                    };
                } 
                // اگر نوع سوال متنی باشد
                else if (question.type === 'text') {
                    const textAnswers = totalResponses.map(response => {
                        const answer = response.answers.find(a => a.questionId.equals(question._id));
                        return answer ? answer.answer : null; // استخراج پاسخ متنی
                    }).filter(answer => answer !== null); // حذف پاسخ‌های نامعتبر

                    return {
                        questionText: question.text,
                        type: 'text',
                        textAnswers
                    };
                }
            });

            // بازگشت اطلاعات تحلیل‌شده
            res.json({ totalParticipants, analysis });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ResponseController();
