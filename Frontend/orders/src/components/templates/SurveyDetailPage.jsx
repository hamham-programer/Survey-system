import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSurveyById, submitResponse } from '../../services/admin';
import { useUser } from '../../router/UserContext';
import styles from './SurveyDetailPage.module.css';
import toast from "react-hot-toast";  

const SurveyDetailPage = () => {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const { userId, userUnit } = useUser();

  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await getSurveyById(surveyId);
        setSurvey(response.data.survey);
        /* console.log("Survey Questions:", response.data.survey.questions); */

        if (response.data.survey.allowedUnits && userUnit) {
          const isAllowed = response.data.survey.allowedUnits.some(allowedUnit => allowedUnit.toString() === userUnit.toString());
          if (!isAllowed) setError('کاربر گرامی اجازه ورود به این نظرسنجی را ندارید واحد شما در لیست واحدهای مجاز قرار ندارد.');
        } else if (!userUnit) {
          setError('واحد کاربر مشخص نشده است.');
        }
        
      } catch (error) {
        console.error('Error fetching survey:', error.message);
        setError('Failed to fetch survey');
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [surveyId, userUnit, navigate]);

  const handleSubmitResponses = async () => {
<<<<<<< HEAD
    if (!userUnit) {
      setError('واحد کاربر مشخص نشده است.');
      return;
    }

    const allQuestionsAnswered = survey.questions.every(question => responses[question._id] !== undefined);
    if (!allQuestionsAnswered) {
=======
    // اعتبارسنجی: اطمینان از اینکه همه سوالات پاسخ داده شده‌اند
    const allQuestionsAnswered = survey.questions.every(
      question => responses[question._id] !== undefined
    );

    if (!allQuestionsAnswered) {
      alert('لطفا به همه سوالات پاسخ دهید.');      
>>>>>>> 6e66e7e62361d68b85a92a198b6383443d420000
      return;
    }

    const formattedAnswers = survey.questions.map(question => ({
      questionId: question._id,
      answer: responses[question._id] || '',
      answerType: question.type,
    }));

    try {
      await submitResponse({ surveyId, user: userId, unit: userUnit, answers: formattedAnswers });
      setSuccess(true);
      setError(null);
      setTimeout(() => {
        navigate('/');
      }, 3000); 
     
    } catch (error) {
      console.error('Error submitting responses:', error.response ? error.response.data : error.message);
<<<<<<< HEAD
      const errorMessage = error.response?.data?.message || "خطا در ارسال پاسخ‌ها! لطفاً دوباره تلاش کنید.";
=======
      setError('خطا در ثبت پاسخ ها لطفا علت را بررسی کنید');
>>>>>>> 6e66e7e62361d68b85a92a198b6383443d420000
      setSuccess(false);
      toast.error(errorMessage);
    }
  };

  const handleChange = (questionId, type, value) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < survey.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  const currentQuestion = survey?.questions[currentQuestionIndex];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{survey.title}</h2>
      {success && <div className={styles.success}>
      همکار محترم نظرات شما با موفقیت ثبت شد. ممنون از وقتی که برای پاسخگویی قرار دادید.
        </div>}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmitResponses(); }}>
        <div className={styles.questionContainer}>
          <p className={styles.questionText}>{currentQuestion.text}</p>

          {currentQuestion?.type === 'text' && (
            <div className={styles.inputGroup}>
              <input
                type="text"
                value={responses[currentQuestion._id] || ''}
                onChange={(e) => handleChange(currentQuestion._id, 'text', e.target.value)}
              />
            </div>
          )}

          {currentQuestion?.type === 'multiple-choice' && (
            <div className={styles.optionsContainer}>
              {currentQuestion.options.map(option => (
                <div key={option} className={styles.option}>
                  <input
                    type="radio"
                    id={option}
                    name={currentQuestion._id}
                    value={option}
                    checked={responses[currentQuestion._id] === option}
                    onChange={() => handleChange(currentQuestion._id, 'multiple-choice', option)}
                  />
                  <label htmlFor={option}>{option}</label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.buttons}>
          {currentQuestionIndex < survey?.questions?.length - 1 ? (
            <button type="button" className={styles.button} onClick={handleNext}>سوال بعدی</button>
          ) : (
            <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
              <i className="fas fa-check-circle"></i> ثبت پاسخ ها
            </button>
          )}
          {currentQuestionIndex > 0 && (
            <button type="button" className={styles.button} onClick={handlePrevious}>سوال قبلی</button>
          )}
        </div>

      </form>
    </div>
  );
};

export default SurveyDetailPage;
