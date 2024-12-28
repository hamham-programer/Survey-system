import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSurveyById, submitResponse, getDrivers } from '../../services/admin';
import { useUser } from '../../router/UserContext';
import styles from './SurveyDetailPageDriver.module.css';
import toast from "react-hot-toast";  


const SurveyDetailPageDriver = () => {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const { userId, userUnit } = useUser();

  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [selectedOutgoingDriver, setSelectedOutgoingDriver] = useState(null);
  const [selectedReturnDriver, setSelectedReturnDriver] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await getSurveyById(surveyId);
        setSurvey(response.data.survey);
        if (response.data.survey.allowedUnits && userUnit) {
          const isAllowed = response.data.survey.allowedUnits.some(allowedUnit => allowedUnit.toString() === userUnit.toString());
          if (!isAllowed) setError('کاربر گرامی اجازه ورود به این نظرسنجی را ندارید واحد شما در لیست واحدهای مجاز قرار ندارد.');
        } else if (!userUnit) {
          setError('واحد کاربر مشخص نشده است.');
        }
      } catch (error) {
        console.error("Error fetching survey:", error);
        setError('مشکل در دریافت نظرسنجی');
      } finally {
        setLoading(false);
      }
    };

    const fetchDrivers = async () => {
      try {
        const driversResponse = await getDrivers();
        setDrivers(driversResponse.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
        setError('مشکل در دریافت اطلاعات راننده‌ها');
      }
    };

    fetchSurvey();
    fetchDrivers();
  }, [surveyId]);

  useEffect(() => {
    if (survey && (selectedOutgoingDriver || selectedReturnDriver)) {
      let questions = [];

      if (selectedOutgoingDriver && selectedReturnDriver && selectedOutgoingDriver === selectedReturnDriver) {
        questions = survey.questions.filter(question =>
          question.driverId?.toString() === selectedOutgoingDriver?.toString()
        );
      } else {
        questions = survey.questions.filter(question => {
          const isOutgoingMatch = selectedOutgoingDriver && question.driverId?.toString() === selectedOutgoingDriver?.toString();
          const isReturnMatch = selectedReturnDriver && question.driverId?.toString() === selectedReturnDriver?.toString();

          return isOutgoingMatch || isReturnMatch;
        });
      }

      setFilteredQuestions(questions);
      setCurrentQuestionIndex(0);
    }
  }, [survey, selectedOutgoingDriver, selectedReturnDriver]);

  const handleSubmitResponses = async () => {
    if (!userUnit) {
      setError('واحد کاربر مشخص نشده است.');
      return;
    }

    const allQuestionsAnswered = filteredQuestions.every(question => responses[question._id] !== undefined);

    if (!allQuestionsAnswered) {
      return;
    }

    const formattedAnswers = filteredQuestions.map(question => ({
      questionId: question._id,
      answer: responses[question._id] || '',
      answerType: question.type,
      driverId: question.driverId,
    }));
    const driverInfo = {
      outgoingDriver: selectedOutgoingDriver,
      returnDriver: selectedReturnDriver,
    };

    try {
      await submitResponse({ surveyId, user: userId, unit: userUnit, answers: formattedAnswers, driverInfo });
      setSuccess(true);
      setError(null);

      setTimeout(() => {
        navigate('/');
      }, 3000); // انتقال کاربر بعد از 3 ثانیه
    } catch (error) {
      console.error("Error submitting responses:", error);
            const errorMessage = error.response?.data?.message || "خطا در ارسال پاسخ‌ها! لطفاً دوباره تلاش کنید.";
      setSuccess(false);
      toast.error(errorMessage);
      setSuccess(false);
    }
  };

  const handleDriverChange = (type, value) => {
    if (type === 'outgoing') setSelectedOutgoingDriver(value);
    if (type === 'return') setSelectedReturnDriver(value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{survey?.title}</h2>
      {success && (
        <div className={styles.success}>
          همکار محترم نظرات شما با موفقیت ثبت شد. ممنون از وقتی که برای پاسخگویی قرار دادید.
        </div>
      )}

      <div className={styles.driverSelection}>
        <label>راننده مسیر رفت خود را انتخاب کنید:</label>
        <select onChange={(e) => handleDriverChange('outgoing', e.target.value)} value={selectedOutgoingDriver || ''}>
          <option value="">انتخاب راننده رفت</option>
          {drivers.map(driver => (
            <option key={driver.id} value={driver._id}>{driver.name}</option>
          ))}
        </select>
        <label>راننده مسیر برگشت خود را انتخاب کنید:</label>
        <select onChange={(e) => handleDriverChange('return', e.target.value)} value={selectedReturnDriver || ''}>
          <option value="">انتخاب راننده برگشت</option>
          {drivers.map(driver => (
            <option key={driver.id} value={driver._id}>{driver.name}</option>
          ))}
        </select>
      </div>

      {currentQuestion && (
        <div className={styles.questionContainer}>
          <p className={styles.questionText}>{currentQuestion.text}</p>
          {currentQuestion.type === 'text' && (
            <input
              className={styles.textInput}
              type="text"
              value={responses[currentQuestion._id] || ''}
              onChange={(e) => setResponses(prev => ({ ...prev, [currentQuestion._id]: e.target.value }))}
            />
          )}
          {currentQuestion.type === 'multiple-choice' && (
            <div>
              {currentQuestion.options.map((option, index) => (
                <label key={index} style={{ display: 'block', marginBottom: '8px' }}>
                  <input
                    className={styles.radioInput}
                    type="radio"
                    name={currentQuestion._id}
                    value={option}
                    checked={responses[currentQuestion._id] === option}
                    onChange={() => setResponses(prev => ({ ...prev, [currentQuestion._id]: option }))}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      <div className={styles.buttons}>
        {currentQuestionIndex < filteredQuestions.length - 1 ? (
          <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)} className={styles.button}>
            سوال بعدی
          </button>
        ) : (
          <button onClick={handleSubmitResponses} className={`${styles.button} ${styles.submitButton}`}>
            ثبت پاسخ‌ها
          </button>
        )}
        {currentQuestionIndex > 0 && (
          <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)} className={styles.button}>
            سوال قبلی
          </button>
        )}
      </div>
    </div>
  );
};

export default SurveyDetailPageDriver;
