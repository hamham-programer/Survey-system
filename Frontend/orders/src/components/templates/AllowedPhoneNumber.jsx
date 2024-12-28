import React, { useState, useEffect } from 'react';
import { addAllowedNumber, removeAllowedNumber, getAllAllowedNumbers } from '../../services/user';
import styles from './AllowedPhoneNumber.module.css'; // Import your CSS module

const AllowedPhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [allowedNumbers, setAllowedNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAllowedNumbers = async () => {
      try {
        const response = await getAllAllowedNumbers();
        setAllowedNumbers(response.data.allowedNumbers.map(num => num.phoneNumber));
      } catch (error) {
        console.error("خطا در بارگذاری شماره‌ها: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllowedNumbers();
  }, []);

  const handleAddPhoneNumber = async () => {
    const phoneRegex = /^[0-9]{11}$/;

    if (phoneRegex.test(phoneNumber) && !allowedNumbers.includes(phoneNumber)) {
      try {
        await addAllowedNumber(phoneNumber);
        setAllowedNumbers(prev => [...prev, phoneNumber]);
        setPhoneNumber('');
      } catch (error) {
        console.error("خطا در افزودن شماره: ", error);
      }
    } else {
      alert("لطفاً یک شماره معتبر و ۱۱ رقمی وارد کنید که قبلاً اضافه نشده باشد.");
    }
  };

  const handleDeletePhoneNumber = async (number) => {
    try {
      await removeAllowedNumber(number);
      setAllowedNumbers(prev => prev.filter(n => n !== number));
    } catch (error) {
      alert("خطا در حذف شماره: " + error.response.data.message);
    }
  };

  // Search function
  const filteredNumbers = allowedNumbers.filter(number =>
    number.includes(searchTerm)
  );

  if (loading) {
    return <div>در حال بارگذاری شماره‌های مجاز...</div>;
  }

  return (
    <div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="شماره تلفن را وارد کنید"
          className={styles.phoneInput}
        />
        <button onClick={handleAddPhoneNumber} className={styles.addButton}>افزودن</button>
      </div>
      <input
        type="text"
        placeholder="جستجو شماره..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.numberList}>
        {filteredNumbers.length > 0 ? (
          filteredNumbers.map((number) => (
            <div key={number} className={styles.numberItem}>
              <span>{number}</span>
              <button onClick={() => handleDeletePhoneNumber(number)} className={styles.deleteButton}>حذف</button>
            </div>
          ))
        ) : (
          <p>شماره‌ای یافت نشد.</p>
        )}
      </div>
    </div>
  );
};

export default AllowedPhoneNumber;
