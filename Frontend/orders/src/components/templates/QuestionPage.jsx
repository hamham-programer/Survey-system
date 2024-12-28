import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  createQuestion,
  deleteQuestion,
  getQuestionsBySurvey,
  getSurveyById,
  getDrivers,
  getOutgoingRoutes,
  getReturnRoutes
} from '../../services/admin';
import styles from './QuestionPage.module.css';

const QuestionPage = () => {
  const { surveyId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ text: '', type: 'text', options: [], surveyId });
  const [newOption, setNewOption] = useState('');
  const [surveyType, setSurveyType] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [outgoingRoutes, setOutgoingRoutes] = useState([]);
  const [returnRoutes, setReturnRoutes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchSurveyType();
      await fetchQuestions();
      await fetchDriversAndRoutes();
    };
    fetchData();
  }, [surveyId]);

  const fetchSurveyType = async () => {
    const response = await getSurveyById(surveyId);
    setSurveyType(response.data.survey.surveyType);
  };

  const fetchQuestions = async () => {
    const response = await getQuestionsBySurvey(surveyId);
    setQuestions(response.data.questions);
  };

  const fetchDriversAndRoutes = async () => {
    const driversResponse = await getDrivers();
    const outgoingRoutesResponse = await getOutgoingRoutes();
    const returnRoutesResponse = await getReturnRoutes();
    setDrivers(driversResponse.data);
    setOutgoingRoutes(outgoingRoutesResponse.data);
    setReturnRoutes(returnRoutesResponse.data);
  };

  const handleCreateQuestion = async () => {
    if (surveyType === 'driver') {
      for (const driver of drivers) {
       /*  console.log("Driver ID:", driver._id) */
        if (newQuestion.type === 'text' || newQuestion.type === 'multiple-choice') {
          const outgoingQuestion = {
            ...newQuestion,
            driverId: driver._id, // استفاده از _id راننده در فیلد driverId
            outgoingRouteId: newQuestion.outgoingRouteId,
            returnRouteId: null, // مسیر برگشت برای سوال مسیر رفت خالی است
            surveyId,
            text: `${newQuestion.text} - (${driver.name})`,
          };
  
         /*  const returnQuestion = {
            ...newQuestion,
            driverId: driver._id, // استفاده از _id راننده در فیلد driverId
            outgoingRouteId: null, // مسیر رفت برای سوال مسیر برگشت خالی است
            returnRouteId: newQuestion.returnRouteId,
            surveyId,
            text: `${newQuestion.text} - مسیر برگشت (${driver.name})`,
            
          }; */
  
          // ایجاد سوالات مسیر رفت و برگشت
          try {
            await createQuestion(outgoingQuestion);
            console.log('Outgoing question created');
          } catch (error) {
            console.error('Error creating outgoing question:', error);
          }
          
          /* try {
            await createQuestion(returnQuestion);
            console.log('Return question created');
          } catch (error) {
            console.error('Error creating return question:', error);
          } */
          
        }
  
        // اگر نوع سوال "راننده/مسیر" باشد، فقط یک سوال برای هر راننده ایجاد می‌شود
        if (newQuestion.type === 'driver-route') {
          const driverRouteQuestion = {
            ...newQuestion,
            driverId: driver._id, // استفاده از _id راننده در فیلد driverId
            surveyId,
            text: `${newQuestion.text} (${driver.name})`
          };
  
          await createQuestion(driverRouteQuestion);
        }
      }
    } else {
      // ایجاد سوال عادی در حالت نظرسنجی نرمال
      await createQuestion(newQuestion);
    }
    
  
    // ریست کردن سوال جدید و گرفتن سوالات جدید بعد از ایجاد سوالات جدید
    setNewQuestion({ text: '', type: 'text', options: [], surveyId });
    fetchQuestions();
  };
  

  const handleDeleteQuestion = async (id) => {
    await deleteQuestion(id);
    fetchQuestions();
  };

  const handleAddOption = () => {
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      options: [...prevQuestion.options, newOption],
    }));
    setNewOption('');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>مدیریت سوالات</h2>

      <div className={styles.formGroup}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="متن سوال"
            value={newQuestion.text}
            onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
            className={styles.input}
          />

          <select
            value={newQuestion.type}
            onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
            className={styles.select}
          >
            <option value="text">متن</option>
            <option value="multiple-choice">چند گزینه‌ای</option>
            {surveyType === 'driver' && <option value="driver-route">راننده/مسیر</option>}
          </select>
        </div>

        {newQuestion.type === 'multiple-choice' && (
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="گزینه جدید"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              className={styles.input}
            />
            <button onClick={handleAddOption} className={styles.button}>افزودن گزینه</button>
            <ul className={styles.optionList}>
              {newQuestion.options.map((option, index) => (
                <li key={index} className={styles.optionItem}>{option}</li>
              ))}
            </ul>
          </div>
        )}

        {newQuestion.type === 'driver-route' && surveyType === 'driver' && (
          <div className={styles.formGroup}>
            <select
              onChange={(e) => setNewQuestion({ ...newQuestion, outgoingRouteId: e.target.value })}
              className={styles.select}
            >
              <option value="">انتخاب مسیر رفت</option>
              {outgoingRoutes.map(route => (
                <option key={route._id} value={route._id}>{route.start}</option>
              ))}
            </select>

            <select
              onChange={(e) => setNewQuestion({ ...newQuestion, returnRouteId: e.target.value })}
              className={styles.select}
            >
              <option value="">انتخاب مسیر برگشت</option>
              {returnRoutes.map(route => (
                <option key={route._id} value={route._id}>{route.end}</option>
              ))}
            </select>
          </div>
        )}

        <button onClick={handleCreateQuestion} className={styles.button}>ایجاد سوال</button>
      </div>

      <ul className={styles.questionList}>
        {questions.map((question) => (
          <li key={question._id} className={styles.questionItem}>
            <div className={styles.questionContent}>
              <div className={styles.questionText}>{question.text}</div>
              <div className={styles.questionType}>
                {question.type === 'text' ? 'متن' : question.type === 'multiple-choice' ? 'چند گزینه‌ای' : 'راننده/مسیر'}
              </div>

              {question.type === 'multiple-choice' && (
                <ul className={styles.questionOptions}>
                  {question.options.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
              )}

              {question.type === 'driver-route' && (
                <div className={styles.routeInfo}>
                  <p>راننده: {drivers.find(driver => driver._id === question.driverId)?.name || 'انتخاب نشده'}</p>
                  <p>مسیر رفت: {outgoingRoutes.find(route => route._id === question.outgoingRouteId)?.start || 'انتخاب نشده'}</p>
                  <p>مسیر برگشت: {returnRoutes.find(route => route._id === question.returnRouteId)?.end || 'انتخاب نشده'}</p>
                </div>
              )}
            </div>

            <button onClick={() => handleDeleteQuestion(question._id)} className={styles.deleteButton}>
              حذف سوال
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionPage;
