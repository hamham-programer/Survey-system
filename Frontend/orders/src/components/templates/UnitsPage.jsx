import React, { useEffect, useState } from 'react';
import { createUnit, getUnits, deleteUnit } from '../../services/admin'; 
import styles from './UnitsPage.module.css'; 

function UnitsPage() {
  const [units, setUnits] = useState([]);
  const [workLocation, setWorkLocation] = useState('نازگل');
  const [organizationName, setOrganizationName] = useState(''); // نام واحد
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await getUnits();
        if (Array.isArray(response.data)) {
          setUnits(response.data);
        } else {
          setError('داده‌ها به درستی دریافت نشدند.');
        }
      } catch (error) {
        setError('خطا در دریافت واحدها');
      }
    };
  
    fetchUnits();
  }, []);

  const handleAddUnit = async (e) => {
    e.preventDefault();
    if (!workLocation || !organizationName) {
      setError('لطفاً تمام فیلدها را پر کنید.');
      return;
    }

    try {
      const newUnit = { 
        workLocation, 
        organization: { name: organizationName } // ارسال فقط نام واحد
      };

      const createdUnit = await createUnit(newUnit);

      if (createdUnit && createdUnit.data) {
        setUnits((prevUnits) => [
          ...prevUnits,
          {
            ...createdUnit.data,
            organization: { name: organizationName }, // اضافه کردن اطلاعات برگشتی از سرور
          },
        ]);
        console.log("لیست واحدها به‌روزرسانی شد:", units);
      }
      
      

      setWorkLocation('');
      setOrganizationName('');
      setError('');
    } catch (error) {
      console.error("خطا در ایجاد واحد:", error);
      setError('خطا در ایجاد واحد');
    }
  };

  const handleDeleteUnit = async (id) => {
    try {
      await deleteUnit(id);
      setUnits(units.filter(unit => unit._id !== id));
    } catch (error) {
      setError('خطا در حذف واحد');
    }
  };
    // Search function
    const filteredUnits = units.filter((unit) => 
      unit.organization?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>مدیریت واحدها</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleAddUnit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="نام شرکت"
            value={workLocation}
            onChange={(e) => setWorkLocation(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="text"
            placeholder="نام واحد"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>ایجاد</button>
        </div>
      </form>

      <input
        type="text"
        placeholder="جستجو واحد..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <ul className={styles.unitList}>
        {Array.isArray(units) && filteredUnits.length > 0 ? (
          filteredUnits.map((unit) => (
            <li key={unit._id} className={styles.unitItem}>
              <span className={styles.unitTitle}>
                {unit.workLocation ? unit.workLocation : 'محل کار نامشخص'} - 
                {unit.organization.name ? unit.organization.name : 'سازمان نامشخص'}
              </span>
              <div className={styles.deleteButtonContainer}>
                <button onClick={() => handleDeleteUnit(unit._id)} className={styles.unitDeleteButton}>
                  حذف
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>هیچ واحدی وجود ندارد.</p>
        )}
      </ul>
    </div>
  );
}

export default UnitsPage;
