import React, { useEffect, useState } from 'react';
import { createDriver, createOutgoingRoute, createReturnRoute, getDrivers, getOutgoingRoutes, getReturnRoutes, deleteDriver, deleteOutgoingRoute, deleteReturnRoute } from '../../services/admin';
import styles from './DriverPage.module.css';

function DriverPage() {
  const [drivers, setDrivers] = useState([]);
  const [driverName, setDriverName] = useState('');
  const [outgoingRouteInput, setOutgoingRouteInput] = useState('');
  const [outgoingRoutes, setOutgoingRoutes] = useState([]);
  const [returnRouteInput, setReturnRouteInput] = useState('');
  const [returnRoutes, setReturnRoutes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await getDrivers();
        if (Array.isArray(response.data)) {
          setDrivers(response.data);
          if (response.data.length > 0) {
            const driverId = response.data[0]._id;
            const outgoingResponse = await getOutgoingRoutes(driverId);
            const returnResponse = await getReturnRoutes(driverId);
            setOutgoingRoutes(outgoingResponse.data);
            setReturnRoutes(returnResponse.data);
          }
        } else {
          setError('داده‌ها به درستی دریافت نشدند.');
        }
      } catch (error) {
        setError('خطا در دریافت رانندگان');
      }
    };

    fetchDrivers();
  }, []);

  const handleAddDriver = async (e) => {
    e.preventDefault();
    if (!driverName) {
      setError('لطفاً نام راننده را وارد کنید.');
      return;
    }

    try {
      const createdDriver = await createDriver({ name: driverName });
      setDrivers(prevDrivers => [...prevDrivers, createdDriver.data.driver]);
      setDriverName('');
      setError('');
    } catch (error) {
      console.error("خطا در ایجاد راننده:", error);
      setError('خطا در ایجاد راننده');
    }
  };

  const handleDeleteDriver = async (id) => {
    try {
      await deleteDriver(id);
      setDrivers(prevDrivers => prevDrivers.filter(driver => driver._id !== id));
      setError('');
    } catch (error) {
      console.error("خطا در حذف راننده:", error);
      setError('خطا در حذف راننده');
    }
  };

  const handleAddOutgoingRoute = async (e) => {
    e.preventDefault();
    if (!outgoingRouteInput) {
      setError('لطفاً مسیر رفت را وارد کنید.');
      return;
    }

    const driverId = drivers[0]?._id;

    try {
      const newRoute = await createOutgoingRoute(driverId, { start: outgoingRouteInput });
      setOutgoingRoutes(prevRoutes => [...prevRoutes, newRoute.data.route]);
      setOutgoingRouteInput('');
      setError('');
    } catch (error) {
      console.error("خطا در ایجاد مسیر رفت:", error);
      setError('خطا در ایجاد مسیر رفت');
    }
  };

  const handleDeleteOutgoingRoute = async (id) => {
    try {
      await deleteOutgoingRoute(id);
      setOutgoingRoutes(prevRoutes => prevRoutes.filter(route => route._id !== id));
      setError('');
    } catch (error) {
      console.error("خطا در حذف مسیر رفت:", error);
      setError('خطا در حذف مسیر رفت');
    }
  };

  const handleAddReturnRoute = async (e) => {
    e.preventDefault();
    if (!returnRouteInput) {
      setError('لطفاً مسیر برگشت را وارد کنید.');
      return;
    }

    const driverId = drivers[0]?._id;

    try {
      const newRoute = await createReturnRoute(driverId, { end: returnRouteInput });
      setReturnRoutes(prevRoutes => [...prevRoutes, newRoute.data.route]);
      setReturnRouteInput('');
      setError('');
    } catch (error) {
      console.error("خطا در ایجاد مسیر برگشت:", error);
      setError('خطا در ایجاد مسیر برگشت');
    }
  };

  const handleDeleteReturnRoute = async (id) => {
    try {
      await deleteReturnRoute(id);
      setReturnRoutes(prevRoutes => prevRoutes.filter(route => route._id !== id));
      setError('');
    } catch (error) {
      console.error("خطا در حذف مسیر برگشت:", error);
      setError('خطا در حذف مسیر برگشت');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>مدیریت رانندگان و مسیرها</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className={styles.mainSection}>
        <div className={styles.driverSection}>
          <h2>افزودن راننده</h2>
          <form onSubmit={handleAddDriver} className={styles.form}>
            <input
              type="text"
              placeholder="نام راننده"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button}>ایجاد </button>
          </form>

          {drivers.length > 0 && (
            <ul className={styles.driverList}>
              {drivers.map(driver => (
                <li key={driver._id} className={styles.driverItem}>
                  {driver.name}
                  <button onClick={() => handleDeleteDriver(driver._id)} className={styles.deleteButton}>حذف</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.routeSection}>
          <h2>افزودن مسیر رفت</h2>
          <form onSubmit={handleAddOutgoingRoute} className={styles.form}>
            <input
              type="text"
              placeholder=" مسیر رفت"
              value={outgoingRouteInput}
              onChange={(e) => setOutgoingRouteInput(e.target.value)}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button}>ایجاد</button>
          </form>

          {outgoingRoutes.length > 0 && (
            <ul className={styles.routeList}>
              {outgoingRoutes.map(route => (
                <li key={route._id} className={styles.routeItem}>
                  {route.start}
                  <button onClick={() => handleDeleteOutgoingRoute(route._id)} className={styles.deleteButton}>حذف</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.returnRouteSection}>
          <h2>افزودن مسیر برگشت</h2>
          <form onSubmit={handleAddReturnRoute} className={styles.form}>
            <input
              type="text"
              placeholder=" مسیر برگشت"
              value={returnRouteInput}
              onChange={(e) => setReturnRouteInput(e.target.value)}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button}>ایجاد  </button>
          </form>

          {returnRoutes.length > 0 && (
            <ul className={styles.routeList}>
              {returnRoutes.map(route => (
                <li key={route._id} className={styles.routeItem}>
                  {route.end}
                  <button onClick={() => handleDeleteReturnRoute(route._id)} className={styles.deleteButton}>حذف</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default DriverPage;
