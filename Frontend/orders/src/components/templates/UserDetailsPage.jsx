import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../services/userService';
import styles from "./UserDetailsPage.module.css";

const UserDetailsPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const { response, error } = await getUserById(userId);
            if (response) {
                setUser(response.data);
            }
            if (error) {
                setError('Failed to fetch user details');
            }
        };

        fetchUser();
    }, [userId]);

    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <div className={styles.form}>
            <h1>جزئیات کاربر</h1>
            {user ? (
                <div>
                    <p><strong>نام و نام خانوادگی:</strong> {user.fullName}</p>
                    <p><strong>کد پرسنلی:</strong> {user.personnelCode}</p>
                    <p><strong>محل فعالیت:</strong> {user.workLocation}</p>
                    <p><strong>شرکت:</strong> {user.organization}</p>
                    <p><strong>نقش:</strong> {user.role}</p>
                </div>
            ) : (
                <p>در حال بارگذاری...</p>
            )}
        </div>
    );
};

export default UserDetailsPage;
