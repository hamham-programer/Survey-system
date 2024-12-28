import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllSurveys } from '../../services/admin';
import styles from './SurveysPage.module.css';

function SurveysPage() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await getAllSurveys();
      const sortedSurveys = response.data.surveys.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setSurveys(sortedSurveys);
    } catch (error) {
      console.error('Failed to fetch surveys:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>نظرسنجی‌ها</h1>
      <ul className={styles.surveyList}>
        {surveys.map((survey) => {
          return (
            <li key={survey._id} className={styles.surveyItem}>
              {survey.surveyType === 'driver' ? (
                <Link to={`/surveyDriver/${survey._id}`} className={styles.surveyTitle}>
                  ⬅ {survey.title}
                </Link>
              ) : (
                <Link to={`/survey/${survey._id}`} className={styles.surveyTitle}>
                  ⬅ {survey.title}
                </Link>
              )}
              <p className={styles.surveyDescription}>{survey.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SurveysPage;
