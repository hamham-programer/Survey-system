import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkProfile, updateProfile } from '../../services/userService';
import { getUnits } from '../../services/admin';  // درخواست گرفتن واحدها
import Select from 'react-select'; 
import styles from "./UserProfilePage.module.css";
import toast from "react-hot-toast"

const UserProfilePage = () => {
    const [fullName, setFullName] = useState('');
    const [personnelCode, setPersonnelCode] = useState('');
    const [workLocation, setWorkLocation] = useState('');
    const [organization, setOrganization] = useState({ id: '', name: '' });
    const [isLoading, setIsLoading] = useState(true); 
    const [profileIncomplete, setProfileIncomplete] = useState(false);
    const [units, setUnits] = useState([]); // واحدهای دریافتی
    const navigate = useNavigate();

<<<<<<< HEAD
    // دریافت واحدهای سازمانی از بکند
    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const response = await getUnits(); // درخواست به بکند
                const unitOptions = response.data.map(unit => ({
                    value: unit._id,
                    label: unit.organization.name
                }));
                setUnits(unitOptions); // ذخیره واحدها برای نمایش
            } catch (error) {
                console.error("خطا در دریافت واحدها:", error);
            }
        };

        fetchUnits();
    }, []);
=======
    const companyList = [
        { value: "دفتر مرکزی تهران", label: "دفتر مرکزی تهران" },
        { value: "مدلل ماهیدشت(نازگل)", label: "مدلل ماهیدشت(نازگل)" },
        { value: "کرمانشاه دانه", label: "کرمانشاه دانه" },
        { value: "مدلل شمال(غنچه)", label: "مدلل شمال(غنچه)" },
        { value: "سیمان مدلل", label: "سیمان مدلل" },
        { value: "گلاره کلهر", label: "گلاره کلهر"},
        { value: "مهرپلاست مدلل", label: "مهرپلاست مدلل"},
        { value: "روغنکشی بندر امام خمینی", label:"روغنکشی بندر امام خمینی"},
        { value: "پروژه غلات", label: "پروژه غلات"},
        { value: "آوا تجارت صبا", label: "آوا تجارت صبا"},
        { value: "نابدانه مدلل" , label: "نابدانه مدلل"},
        { value: "دامپروری باوان کلهر",  label: "دامپروری باوان کلهر"},
        { value: "دامپروری میلکان", label: "دامپروری میلکان"},
        { value:"کلهر شیمی", label: "کلهر شیمی"}, 
        {value: "ناب شکر",label: "ناب شکر",}, 
        {value: "اسکله بندر",label: "اسکله بندر"}, 
        {value: "سنگین بار کلهر", label: "سنگین بار کلهر"}, 
        {value:"کلهر بار " ,label: " کلهر بار"}, 
    ];

    const companyUnit = [
        { id: 1, label: "مدیریت" },
        { id: 2, label: "مالی" },
        { id: 3, label: "تدارکات" },
        { id: 4, label: "کارگزینی" },
        { id: 5, label: "برنامه ریزی و انبارها" },
        { id: 6, label: "انفورماتیک" },
        { id: 7, label: "اداری گلاره کلهر" },
        { id: 8, label: "فروش روغن نباتی" },
        { id: 9, label: "فروش روغنکشی" },
        { id: 10, label: "ایمنی و بهداشت" },
        { id: 11, label: "تحقیق و توسعه" },
        { id: 12, label: "مخابرات" },
        { id: 13, label: "آموزش" },
        { id: 14, label: "حراست" },
        { id: 15, label: "لیسیتین" },
        { id: 16, label: "ساختمانی" },
        { id: 17, label: "بارگیری کنجاله" },
        { id: 18, label: "پلیت کنی فاز1" },
        { id: 19, label: "پلیت کنی فاز2" },
        { id: 20, label: "آماده سازی فاز1" },
        { id: 21, label: "آماده سازی فاز2" },
        { id: 22, label: "جوشکاری روغنکشی" },
        { id: 23, label: "جوشکاری روغن نباتی" },
        { id: 24, label: "آزمایشگاه روغنکشی" },
        { id: 25, label: "آزمایشگاه کنترل کیفیت روغن نباتی" },
        { id: 26, label: "آزمایشگاه تضمین کیفیت روغن نباتی" },
        { id: 27, label: "انبار کنجاله" },
        { id: 28, label: "سس" },
        { id: 29, label: "اکستراکشن فاز 1" },
        { id: 30, label: "اکستراکشن فاز 2" },
        { id: 31, label: "الکترونیک و ابزار دقیق" },
        { id: 32, label: "الکترو لایزر" },
        { id: 33, label: "انبار محصول" },
        { id: 34, label: "انبار مواد اولیه" },
        { id: 35, label: "انبار قطعات روغن نباتی" },
        { id: 36, label: "انبار قطعات روغنکشی" },
        { id: 37, label: "پرکنی بطری" },
        { id: 38, label: "پرکنی جامد" },
        { id: 39, label: "مارگارین" },
        { id: 40, label: "اسید چرب" },
        { id: 41, label: "پالایش" },
        { id: 42, label: "ترابری" },
        { id: 43, label: "تراشکاری" },
        { id: 44, label: "پساب" },
        { id: 45, label: "تضمین کیفیت" },
        { id: 46, label: "کنترل کیفیت" },
        { id: 47, label: "آزمایشگاه مواد اولیه روغن نباتی " },
        { id: 48, label: "آزمایشگاه روغنکشی" },
        { id: 49, label: "سیلو" },
        { id: 50, label: "تعمیرات" },
        { id: 51, label: "تولید روغنکشی" },
        { id: 52, label: "تولید روغن نباتی" },
        { id: 53, label: "چاپ" },
        { id: 54, label: "خدمات" },
        { id: 55, label: "فضای سبز" },
        { id: 56, label: "خنثی سازی" },
        { id: 57, label: "دبیرخانه" },
        { id: 58, label: "رستوران" },
        { id: 59, label: "دیپ بخار روغنکشی" },
        { id: 60, label: "دیگ بخار روغن نباتی" },
        { id: 61, label: "روابط عمومی" },
        { id: 62, label: "آموزش" },
        { id: 63, label: "انفورماتیک" },
        { id: 64, label: "فنی روغن نباتی" },
        { id: 65, label: "فنی روغن کشی" },
        { id: 66, label: "قطعه سازی" },
        { id: 67, label: "قوطی سازی" },
        { id: 68, label: "کارگزینی" },
        { id: 69, label: "کنترل فرایمد روغن کشی" },
        { id: 70, label: "مدیریت انرژی" },
        { id: 71, label: "وینترایز" },
        { id: 72, label: "هیدروژناسیون" },
        { id: 73, label: "ساختمانی" },
        { id: 74, label: "سایر" },
        { id: 75, label: "روزمزد" },
        { id: 76, label: "بارگیری روغن خام" },
        { id: 77, label: "بی بو سازی" },

    ];
>>>>>>> 6e66e7e62361d68b85a92a198b6383443d420000

    useEffect(() => {
        const verifyProfile = async () => {
            const { response, error } = await checkProfile();
            if (error) {
                console.error("Error checking profile:", error?.response);
                return;
            }
            if (response && response.isProfileCompleted) {
                navigate('/'); 
            } else {
                setProfileIncomplete(true); 
            }
            setIsLoading(false); 
        };

        verifyProfile();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Organization:", organization)
        if (!fullName || !personnelCode || !organization) {
            toast.error("لطفاً تمام فیلدها را پر کنید.");
            return;
        }
        const { response, error } = await updateProfile({ fullName, personnelCode, workLocation, organization });
        if (response) {
            navigate('/');
        } else {
            console.error('Error updating profile:', error);
        }
    };

    if (isLoading) {
        return <div>در حال بارگذاری...</div>; 
    }

    if (!profileIncomplete) {
        return null; 
    }

    return (
        <div className={styles.form}>
            <h1>بروزرسانی اطلاعات کاربر</h1>
            <p>همکار محترم برای ورود اولیه اطلاعات خود را دقیق وارد کنید. در نوبت بعدی نیازی به وارد کردن این اطلاعات نمی باشد</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fullName">نام و نام خانوادگی را وارد کنید:</label>
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
                    <label htmlFor="personnelCode">کد پرسنلی را وارد کنید:</label>
                    <input
                        id="personnelCode"
                        type="text"
                        value={personnelCode}
                        onChange={(e) => setPersonnelCode(e.target.value)}
                        placeholder="کد پرسنلی"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="organization">واحد سازمانی را انتخاب کنید:</label>
                    <Select
                        id="organization"
                        options={units} 
                        getOptionLabel={(option) => option.label}
                        getOptionValue={(option) => option.value}
                        onChange={(newValue) => setOrganization(newValue ? newValue.value : '')}
                        placeholder="واحد سازمانی"
                    />
                </div>
                <button type="submit">ثبت اطلاعات</button>
            </form>
        </div>
    );
};

export default UserProfilePage;
