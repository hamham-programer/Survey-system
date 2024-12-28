import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSurveyAnalysis } from '../../services/admin';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import styles from './SurveyAnalysisDriverPage.module.css';
import Loader from '../modules/Loader';

const SurveyAnalysisDriverPage = () => {
  const { surveyId } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!surveyId) {
        setError("خطا: surveyId معتبر نیست.");
        setLoading(false);
        return;
      }

      try {
        const data = await getSurveyAnalysis(surveyId);
        console.log("داده‌های تحلیل:", data);
        const groupedData = combineDriverAnswers(data.analysis);
        setAnalysis({ ...data, analysis: groupedData });
      } catch (err) {
        setError("خطا در دریافت تحلیل: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [surveyId]);

  const combineDriverAnswers = (questions) => {
    const groupedByDriver = {};

    questions.forEach((question) => {
      const { driverId, questionText, type, textAnswers, options, optionCounts } = question;

      if (!groupedByDriver[driverId]) {
        groupedByDriver[driverId] = {
          driverId,
          textQuestions: [],
          multipleChoiceQuestions: [],
        };
      }

      // ترکیب سوالات رفت و برگشت
      const questionTextWithoutRoute = questionText.replace(/- مسیر رفت.*|- مسیر برگشت.*/g, "");

      if (type === 'text') {
        groupedByDriver[driverId].textQuestions.push({
          questionText: questionTextWithoutRoute,
          textAnswers: textAnswers || [],
        });
      } else if (type === 'multiple-choice') {
        const totalResponses = Object.values(optionCounts).reduce((a, b) => a + b, 0);
        const combinedOptions = options.map((option) => ({
          name: option,
          تعداد: optionCounts[option] || 0,
          درصد: totalResponses > 0 ? ((optionCounts[option] || 0) / totalResponses) * 100 : 0,
        }));

        groupedByDriver[driverId].multipleChoiceQuestions.push({
          questionText: questionTextWithoutRoute,
          options: combinedOptions,
        });
      }
    });

    return Object.values(groupedByDriver);
  };

  if (loading) return <Loader />;
  if (error) return <p className={styles.error}>{error}</p>;

  const handlePrint = () => {
    window.print();
    
  };

  return (
    
    <div className={styles.surveyAnalysisContainer}>
      <h2 className={styles.surveyTitle}>گزارش تحلیل نظر سنجی برگزار شده در مجتمع کشت و صنعت مدلل ماهیدشت</h2>
      <p className={styles.participantsCount}>
        تعداد شرکت‌کنندگان: {analysis?.totalParticipants || 0}
      </p>

      <div className={styles.printableSection}>
        {analysis?.analysis?.map((driverData, index) => (
          <div key={index} className={styles.driverSection}>

            {/* سوالات چندگزینه‌ای */}
            <div className={styles.multipleChoiceQuestionsSection}>
              <h4>تحلیل سوالات چندگزینه‌ای:</h4>
              <br/>
              {driverData.multipleChoiceQuestions.map((question, idx) => (
                <div key={idx} className={styles.multipleChoiceQuestion}>
                  <h4>سوال: {question.questionText}</h4>
                  <ul className={styles.optionsList}>
                    {question.options.map((option, optionIdx) => (
                      <li key={optionIdx} className={styles.optionItem}>
                        {option.name}: {option.تعداد} پاسخ (درصد: {option.درصد.toFixed(1)}%)
                      </li>
                    ))}
                  </ul>

                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={question.options}
                      layout="vertical"
                      margin={{ top: 20, right: 10, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}/>
                      <YAxis dataKey="name" type="category" hide/>
                      <Tooltip />
                      <Bar dataKey="درصد" fill="#82ca9d">
                        <LabelList dataKey="درصد" position="right" formatter={(value) => `${value.toFixed(1)}%`} 
						          style={{ fill: 'black', fontSize: 15 }} 
					
						/>
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>

            {/* سوالات متنی */}
            <div className={styles.textQuestionsSection}>
              <h4>تحلیل سوالات متنی:</h4>
              <br/>
              {driverData.textQuestions.map((question, idx) => (
                <div key={idx} className={styles.textQuestion}>
                  <h4>سوال: {question.questionText}</h4>
                  <p>پاسخ‌ها:</p>
                  <ul>
                    {question.textAnswers.length > 0 ? (
                      question.textAnswers.map((answer, answerIdx) => (
                        <li key={answerIdx} className={styles.textAnswer}>
                          {answer}
                        </li>
                      ))
                    ) : (
                      <li className={styles.textAnswer}>هیچ پاسخی ثبت نشده است.</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

      <button onClick={handlePrint} className={styles.printButton}>
        چاپ تحلیل
      </button>
    </div>
  );
};

export default SurveyAnalysisDriverPage;
