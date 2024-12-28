import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSurveyAnalysis } from '../../services/admin';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import styles from './SurveyAnalysisPage.module.css'; 
import Loader from '../modules/Loader';

const SurveyAnalysisPage = () => {
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
        setAnalysis(data);
      } catch (err) {
        setError("خطا در دریافت تحلیل: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [surveyId]);

  if (loading) return <Loader />;
  if (error) return <p className={styles.error}>{error}</p>;

  const handlePrint = () => {
    window.print();
  };

  const multipleChoiceQuestions = analysis.analysis.filter(item => item.type === 'multiple-choice');
  const textQuestions = analysis.analysis.filter(item => item.type === 'text');

  return (
    <div className={styles.surveyAnalysisContainer}>
      <h2 className={styles.surveyTitle}>گزارش تحلیل نظر سنجی برگزار شده در مجتمع کشت و صنعت مدلل ماهیدشت</h2>
      <p className={styles.participantsCount}>تعداد شرکت‌کنندگان: {analysis.totalParticipants}</p>

      <div className={styles.printableSection}>
        {multipleChoiceQuestions.map((item, index) => (
          <div key={index} className={styles.questionSection}>
            <h3 className={styles.questionText}>سوال: {item.questionText}</h3>
            <ul className={styles.optionsList}>
              {item.options.map((option, idx) => (
                <li key={idx} className={styles.optionItem}>
                  {option}: {item.optionCounts[option]} پاسخ (درصد: {item.optionPercentages[option]?.toFixed(1)}%)
                </li>
              ))}
            </ul>

            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={item.options.map(option => ({
                  name: option,
                  تعداد: item.optionCounts[option],
                  درصد: item.optionPercentages[option]?.toFixed(1) || 0
                }))}
                layout="vertical"
                margin={{ top: 5, right: 10, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} />
                <YAxis dataKey="name" type="category" hide />
                <Tooltip />
                <Bar dataKey="درصد" fill="#82ca9d">
                  <LabelList dataKey="درصد" position="right" formatter={(value) => `${value}%`} 
                   style={{ fill: 'black', fontSize: 15 }} 
				  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))}

        <div className={styles.textQuestionsSection}>
          <h3>سوالات متنی:</h3>
          {textQuestions.map((item, index) => (
            <div key={index} className={styles.textQuestion}>
              <h4>سوال: {item.questionText}</h4>
              <p>پاسخ‌ها:</p>
              <ul>
                {item.textAnswers && item.textAnswers.length > 0 ? (
                  item.textAnswers.map((answer, idx) => (
                    <li key={idx} className={styles.textAnswer}>
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

      <button onClick={handlePrint} className={styles.printButton}>چاپ تحلیل</button>
    </div>
  );
};

export default SurveyAnalysisPage;
