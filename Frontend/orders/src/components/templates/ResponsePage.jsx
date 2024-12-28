import React, { useState, useEffect } from 'react';
import { getSurveyDetails, submitResponse } from '../services/responseService';
import { useUser } from '../../router/UserContext';

const ResponsePage = ({ surveyId }) => {
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const { userId } = useUser();  // دریافت userId از کانتکست

  useEffect(() => {
    const fetchSurveyDetails = async () => {
      try {
        const surveyData = await getSurveyDetails(surveyId);
        setSurvey(surveyData);
      } catch (error) {
        console.error('Error fetching survey details:', error);
      }
    };

    fetchSurveyDetails();
  }, [surveyId]);
  const handleSubmitResponse = async () => {
    try {
        const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => {
            const question = survey.questions.find(q => q._id === questionId);
            if (!question) {
                throw new Error(`Question with ID ${questionId} not found`);
            }
            return {
                questionId,
                answer,
                answerType: question.type || "text", // استفاده از نوع سوال
            };
        });
        console.log('Formatted Answers:', formattedAnswers);
        await submitResponse({
            surveyId,
            userId,
            allowedUnits: survey.allowedUnits,
             /* answers: JSON.stringify(formattedAnswers), // تبدیل به JSON  */
             answers: formattedAnswers 
        });
        setAnswers({}); // reset answers بعد از ارسال
    } catch (error) {
        console.error('Error submitting response:', error);
    }
};

  
  const handleChange = (e, questionId) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: e.target.value
    }));
  };

  if (!survey) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{survey.title}</h2>
      {survey.questions.map(question => (
        <div key={question._id}>
          <label>{question.text}</label>
          {question.type === 'multiple-choice' ? (
            <select onChange={(e) => handleChange(e, question._id)} value={answers[question._id] || ''}>
              <option value="">انتخاب کنید</option>
              {question.options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <textarea
              placeholder="پاسخ شما"
              value={answers[question._id] || ''}
              onChange={(e) => handleChange(e, question._id)}
            />
          )}
        </div>
      ))}
      <button onClick={handleSubmitResponse}>ارسال پاسخ</button>
    </div>
  );
};

export default ResponsePage;
