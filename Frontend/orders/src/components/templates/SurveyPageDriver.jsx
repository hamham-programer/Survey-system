import React, { useEffect, useState } from 'react';
import { createSurvey, deleteSurvey, getAllSurveys } from '../../services/admin';
import { Link } from 'react-router-dom'; 
import styles from './SurveyPage.module.css';
import { getUnits } from '../../services/admin';
import Select from 'react-select'; 

const SurveyPage = () => {
  const [surveys, setSurveys] = useState([]);
  const [units, setUnits] = useState([]); 
  const [selectedUnits, setSelectedUnits] = useState([]); 
  const [newSurvey, setNewSurvey] = useState({ 
    title: '', 
    description: '', 
    questions: [], 
    duration: 3, 
    allowedUnits: [] 
  });

  useEffect(() => {
    fetchSurveys();
    fetchUnits();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await getAllSurveys();
      setSurveys(response.data.surveys);
    } catch (error) {
      console.error("Error fetching surveys:", error);
    }
  };
  
  const fetchUnits = async () => {
    try {
      const response = await getUnits();
      if (response.data && Array.isArray(response.data)) {
        const unitData = response.data.map(unit => ({ 
          id: unit._id, 
          name: `${unit.organization.name} ` 
        }));
        setUnits(unitData);
      } else {
        console.error("No valid units found in response");
      }
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };

  const handleCreateSurvey = async () => {
    if (newSurvey.duration < 1) {
      alert("مدت زمان فعال بودن نظرسنجی باید حداقل 1 روز باشد.");
      return;
    }

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + newSurvey.duration);

    if (!newSurvey.title || !newSurvey.description) {
      alert("لطفاً عنوان و توضیحات را پر کنید.");
      return;
    }

    try {
      await createSurvey({ 
        ...newSurvey, 
        allowedUnits: selectedUnits.map(unit => ({
          unit: unit.value,
          name: unit.label
        })), 
        expirationDate 
      });
      setNewSurvey({ title: '', description: '', questions: [], duration: 1 });
      setSelectedUnits([]); 
      fetchSurveys();
    } catch (error) {
      console.error("Error creating survey:", error);
    }
  };

  const handleDeleteSurvey = async (id) => {
    const confirmed = window.confirm("آیا مطمئن هستید که می‌خواهید این نظرسنجی را حذف کنید؟");
    if (confirmed) {
      try {
        await deleteSurvey(id);
        fetchSurveys();
      } catch (error) {
        console.error("Error deleting survey:", error);
      }
    }
  };

  const handleUnitChange = (selectedOptions) => {
    setSelectedUnits(selectedOptions);
  };

  // بررسی وضعیت انتخاب همه
  const isAllSelected = units.length > 0 && selectedUnits.length === units.length;

  // تابع برای انتخاب یا لغو انتخاب همه
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedUnits([]); // لغو انتخاب همه واحدها
    } else {
      setSelectedUnits(units.map(unit => ({
        value: unit.id,
        label: unit.name
      }))); // انتخاب تمام واحدها
    }
  };
  

  // تبدیل واحدها به فرمت مناسب برای react-select
  const unitOptions = [
    {
      value: 'selectAll',
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input 
            type="checkbox" 
            checked={isAllSelected} 
            onChange={handleSelectAll}
          />
          <span style={{ marginLeft: '8px' }}>انتخاب همه</span>
        </div>
      ),
    },
    ...units.map(unit => ({
      value: unit.id,
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input 
            type="checkbox" 
            checked={selectedUnits.some(selected => selected.value === unit.id)} 
            onChange={() => handleUnitChange(selectedUnits.some(selected => selected.value === unit.id) 
              ? selectedUnits.filter(selected => selected.value !== unit.id) // حذف واحد از انتخاب‌ها
              : [...selectedUnits, { value: unit.id, label: unit.name }])} // اضافه کردن واحد به انتخاب‌ها
          />
          <span style={{ marginLeft: '8px' }}>{unit.name}</span>
        </div>
      ),
    })),
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>مدیریت نظرسنجی‌ها</h2>
      <div className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="عنوان"
          value={newSurvey.title}
          onChange={(e) => setNewSurvey({ ...newSurvey, title: e.target.value })}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="توضیحات"
          value={newSurvey.description}
          onChange={(e) => setNewSurvey({ ...newSurvey, description: e.target.value })}
        />
        <input
          className={styles.inputd}
          type="number"
          min="1"
          placeholder="مدت زمان (روز)"
          value={newSurvey.duration}
          onChange={(e) => setNewSurvey({ ...newSurvey, duration: parseInt(e.target.value) })}
        />

        {/* نمایش واحدها با استفاده از react-select */}
        <Select
          options={unitOptions}
          isMulti
          onChange={handleUnitChange}
          placeholder="انتخاب واحدها..."
          className={styles.select}
        />

        <button className={styles.button} onClick={handleCreateSurvey}>ایجاد نظرسنجی</button>
      </div>

      <ul className={styles.surveyList}>
        {surveys.length > 0 ? (
          surveys.map((survey) => (
            <li className={styles.surveyItem} key={survey._id}>
              <div className={styles.surveyItemContent}>
                <span className={styles.surveyTitle}>{survey.title}</span>
                <span className={styles.surveyDescription}>{survey.description}</span>
                
                {new Date(survey.expirationDate) < new Date() && (
                  <span className={styles.expired}>نظرسنجی منقضی شده است</span>
                )}
              </div>
              <div className={styles.actions}>
                <Link className={styles.link} to={`/survey/${survey._id}/questions`}>ایجاد سوالات</Link>
                <button className={styles.deleteButton} onClick={() => handleDeleteSurvey(survey._id)}>حذف نظرسنجی</button>
                <Link className={styles.link} to={`/survey/${survey._id}/responses`}>مشاهده پاسخ‌ها</Link>
              </div>
            </li>
          ))
        ) : (
          <p>هیچ نظرسنجی‌ای موجود نیست.</p>
        )}
      </ul>
    </div>
  );
};

export default SurveyPage;
