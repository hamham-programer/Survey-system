import React, { useEffect, useState } from 'react';
import { createSurvey, deleteSurvey, getAllSurveys, getUnits } from '../../services/admin';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import styles from './SurveyPage.module.css';

const SurveyPage = () => {
  const [surveys, setSurveys] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [newSurvey, setNewSurvey] = useState({
    title: '',
    description: '',
    questions: [],
    duration: 3,
    allowedUnits: [], // فقط _id واحدها در اینجا قرار می‌گیرد
    surveyType: 'normal'
  });

  useEffect(() => {
    fetchSurveys();
    fetchUnits();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await getAllSurveys();
      const sortedSurveys = response.data.surveys.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setSurveys(sortedSurveys);
    } catch (error) {
      console.error("خطا در دریافت نظرسنجی‌ها:", error);
    }
  };

  const fetchUnits = async () => {
    try {
      const response = await getUnits();
      if (response.data && Array.isArray(response.data)) {
        const unitData = response.data.map(unit => ({
          value: unit._id, // ذخیره _id واحد
          label: unit.organization.name // نمایش نام واحد
        }));
        setUnits(unitData);
      } else {
        console.error("واحد معتبری یافت نشد.");
      }
    } catch (error) {
      console.error("خطا در دریافت واحدها:", error);
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
    const validUnits = selectedUnits.filter(unit => unit.value !== 'selectAll').map(unit => unit.value);

    try {
      // از _id واحدها به عنوان allowedUnits استفاده می‌شود
      await createSurvey({
        ...newSurvey,
        allowedUnits: validUnits,
        expirationDate
      });

      setNewSurvey({ title: '', description: '', questions: [], duration: 1, surveyType: 'normal' });
      setSelectedUnits([]);
      fetchSurveys();
    } catch (error) {
      console.error("خطا در ایجاد نظرسنجی:", error.response ? error.response.data : error.message);
    }
  };

  const handleDeleteSurvey = async (id) => {
    const confirmed = window.confirm("آیا مطمئن هستید که می‌خواهید این نظرسنجی را حذف کنید؟");
    if (confirmed) {
      try {
        await deleteSurvey(id);
        fetchSurveys();
      } catch (error) {
        console.error("خطا در حذف نظرسنجی:", error);
      }
    }
  };

  const handleUnitChange = (selectedOptions) => {
    setSelectedUnits(selectedOptions || []);
  };

  const handleSurveyTypeChange = (event) => {
    setNewSurvey({ ...newSurvey, surveyType: event.target.value });
  };

  const isAllSelected = selectedUnits.length === units.length &&
   units.every(unit => selectedUnits.some(selected => selected.value === unit.value));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedUnits([]);
    } else {
      setSelectedUnits(units);
    }
  };

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
    ...units
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

        {/* نوع نظرسنجی */}
        <select
          value={newSurvey.surveyType}
          className={styles.inputd}
          onChange={handleSurveyTypeChange}
        >
          <option disabled>نوع نظرسنجی</option>
          <option value="normal">عادی</option>
          <option value="driver">رانندگان</option>
        </select>

        <Select
          options={unitOptions}
          isMulti
          value={selectedUnits}
          onChange={handleUnitChange}
          placeholder="انتخاب واحدها..."
          className={styles.select}
          classNamePrefix="react-select"
          closeMenuOnSelect={false} // منو باز می‌ماند
          hideSelectedOptions={false} // موارد انتخاب‌شده در منو نمایش داده شود
          styles={{
            valueContainer: (base) => ({
              ...base,
              maxHeight: '30px', // حداکثر ارتفاع کانتینر انتخاب‌ها
              overflowY: 'auto', // اسکرول برای موارد انتخاب‌شده
            }),
            control: (base) => ({
              ...base,
              minHeight: '45px', // تنظیم حداقل ارتفاع
              height: '45px', // تنظیم ارتفاع کلی
            }),
            
            multiValue: (base) => ({
              ...base,
              display: 'none', // مخفی کردن تگ‌ها
            }),
          }}         
        />

        <button className={styles.button} onClick={handleCreateSurvey}>ایجاد </button>
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
                {survey.surveyType === 'driver' ? (
                  <Link className={styles.link} to={`/survey/${survey._id}/responses-drivers`}>تحلیل رانندگان</Link>
                ) : (
                  <Link className={styles.link} to={`/survey/${survey._id}/responses`}>تحلیل</Link>
                )}                <button className={styles.deleteButton} onClick={() => handleDeleteSurvey(survey._id)}>حذف نظرسنجی</button>
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
