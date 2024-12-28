import toast from "react-hot-toast";
import {sendOtp} from "../../services/auth"; 
import {getAllAllowedNumbers } from "../../services/user"; 
import { useEffect, useState } from "react";
import styles from "./SendOtp.module.css"; 

function SendOtpForm({ mobile, setMobile, setStep }) {
  const [allowedNumbers, setAllowedNumbers] = useState([]);

  useEffect(() => {
    const fetchAllowedNumbers = async () => {
      try {
        const response = await getAllAllowedNumbers();
        console.log("Allowed numbers response:", response.data.allowedNumbers); 
         if (Array.isArray(response.data.allowedNumbers) && response.data.allowedNumbers.length > 0) {
      setAllowedNumbers(response.data.allowedNumbers.map(num => num.phoneNumber));
    } else {
      toast.error("شماره‌های مجاز یافت نشد.");
    }
/*         setAllowedNumbers(response.data.allowedNumbers.map(num => num.phoneNumber));
 */      } catch (error) {
  console.error("Error fetching allowed numbers:", error); // نمایش خطا در کنسول

        /* toast.error("خطا در بارگذاری شماره‌های مجاز."); */
      }
    };

    fetchAllowedNumbers();
  }, []);

  const submithandler = async (event) => {
    event.preventDefault();
    /* console.log("Entered mobile number:", mobile); 
  console.log("Allowed numbers list:", allowedNumbers); */ 
    if (mobile.length !== 11) {
      toast.error("شماره موبایل باید ۱۱ رقم باشد.");
      return;
    }

    // بررسی شماره موبایل در لیست شماره‌های مجاز
    if (!allowedNumbers.includes(mobile)) {
      toast.error("شماره تلفن شما مجاز نیست. لطفا از واحد مربوطه بررسی کنید.");
      return;
    }

    const { response, error } = await sendOtp(mobile);
    if (response && response.data) {
      toast.success(response.data.message);
      setStep(2);
    }
    if (error && error.response && error.response.data) {
      toast.error(error.response.data.message);
    }
    /* console.log(response, error); */
  };

  return (
    <form onSubmit={submithandler} className={styles.form}>
      <h1>انتخاب | کرمانشاه</h1>
      <p>ورود به حساب کاربری</p>
      <span>همکار گرامی برای ورود به سامانه انتخاب لطفا شماره موبایل ثبت شده در شرکت را وارد کنید. کد تایید به این شماره پیامک خواهد شد</span>

      <label htmlFor="input"> لطفا شماره موبایل خود را وارد کنید</label>
      <input type="text" name="input" id="input" placeholder="شماره موبایل"
        value={mobile} onChange={e => setMobile(e.target.value)} />

      <button type="submit">ارسال کد تایید</button>
    </form>
  );
}

export default SendOtpForm;
