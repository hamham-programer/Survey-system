import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUserByAdmin } from '../../services/userService';
import styles from "./AdminUpdateUserPage.module.css";
import toast from 'react-hot-toast';

const AdminUpdateUserPage = () => {
    const { userId } = useParams();
    const [fullName, setFullName] = useState('');
    const [personnelCode, setPersonnelCode] = useState('');
    const [workLocation, setWorkLocation] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    
    useEffect(() => {
        // Fetch user data by userId if needed
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { response, error } = await updateUserByAdmin(userId, { fullName, personnelCode, workLocation, role });
        if (response) {
            toast.success("بروزرسانی با موفقیت انجام شد");
            navigate("/admin/all-users");
        }
        if (error) {
            setError('Failed to update user');
        }
    };

    return (
        <div className={styles.form}>
            <h1>بروزرسانی کاربر</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fullName">نام و نام خانوادگی</label>
                    <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="نام و نام خانوادگی"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="personnelCode">کد پرسنلی</label>
                    <input
                        id="personnelCode"
                        type="text"
                        value={personnelCode}
                        onChange={(e) => setPersonnelCode(e.target.value)}
                        placeholder="کد پرسنلی"
                    />
                </div>
                <div>
                    <label htmlFor="workLocation">محل فعالیت</label>
                    <input
                        id="workLocation"
                        type="text"
                        value={workLocation}
                        onChange={(e) => setWorkLocation(e.target.value)}
                        placeholder="محل فعالیت"
                    />
                </div>
                <div>
                    <label htmlFor="role">نقش کاربر</label>
                    <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="">نقش کاربر:</option>
                        <option value="USER">کاربر عادی</option>
                        <option value="ADMIN">ادمین</option>
                    </select>
                </div>
                <button type="submit">بروزرسانی کاربر</button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
};

export default AdminUpdateUserPage;
