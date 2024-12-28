import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { getAllUsers } from '../../services/userService';
import styles from "./AllUsersPage.module.css";

const AllUsersPage = () => {
    
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [workLocationCounts, setWorkLocationCounts] = useState({});
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { response, error } = await getAllUsers();
                console.log("responsebackend", response);
                
                if (response) {
                    setUsers(response.data.users);
                    setFilteredUsers(response.data.users);
                }
                if (error) {
                    setError('Failed to fetch users');
                    console.error('Error fetching users:', error);
                }
            } catch (error) {
                setError('An unexpected error occurred');
                console.error('Unexpected error:', error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const results = users.filter(user => {
            const fullName = user.fullName || '';
            const personnelCode = user.personnelCode || '';
            const organization = user.organization || '';
            const workLocation = user.workLocation || '';
            
            return fullName.includes(searchTerm) ||
                   personnelCode.includes(searchTerm) ||
                   organization.includes(searchTerm)  ||
                   workLocation.includes(searchTerm);
        });
        setFilteredUsers(results);
    }, [searchTerm, users]);
   
    return (
        <div className={styles.form}>
            <h1>لیست تمام کاربران</h1>
            {error && <p>{error}</p>}
            <input 
                type="text" 
                placeholder="جستجو" 
                value={searchTerm} 
                onChange={ (e) =>setSearchTerm(e.target.value)}
                className={styles.searchInput}
            />
            <table>
                <thead>
                    <tr>
                        <th>نام و نام خانوادگی</th>
                        <th>موبایل</th>
                        <th>کد پرسنلی</th>
                        <th>نام شرکت</th>
                        <th>نقش کاربر</th>
                        <th>عملیات</th> 
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user._id}>
                            <td>{user.fullName}</td>
                            <td>{user.mobile}</td>
                            <td>{user.personnelCode}</td>
                            <td>{}</td>
                            <td>{user.role}</td>
                            <td>
                                <Link to={`/user/${user._id}`} className={styles.detailLink}> جزئیات</Link> 
                                <Link to={`/admin/update-user/${user._id}`} className={styles.editLink}>ویرایش</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllUsersPage;
