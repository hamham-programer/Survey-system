import toast from "react-hot-toast"
import { chechOtp } from "../../services/auth"
import {setCookie} from "../../utils/cookie"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProfile } from "../../services/user"
import styles from "./CheckOtp.module.css"
function CheckOtpForm({code, setCode, setStep, mobile}) {
  const navigate = useNavigate()
  const {refetch} = useQuery(["profile"], getProfile)
  const submitHandler = async (event) =>{
    event.preventDefault()
    if(code.length !== 5) return
    const {response, error} = await chechOtp(mobile, code)
    if(response){
      toast.success(response.data.message)
      navigate("/profile")
      refetch()//دوباره پروفایل را میفرستیم بعد از گرفتن اکسس توکن بسمت)(whoami)
    }
     if(error) toast.error(error.response.data.message)

  }
  return (
    <form onSubmit={submitHandler} className={styles.form}> 
          <h1>انتخاب | کرمانشاه</h1>
      <p>تایید کد پیامک شده به تلفن  همراه </p>
      <span> کد پیامک شده به شماره موبایل "{mobile}" را وارد کنید</span>

      <label htmlFor="input">لطفا کد تایید را وارد کنید</label>
      <input type="text" name="input" id="input" placeholder="کد تایید" 
       value={code} onChange={e => setCode(e.target.value)}/>
       <button type="submit" className={styles.submitButton}>ورود به سامانه</button>
       <button onClick={() => setStep(1)} className={styles.backButton}>&#8594; تغییر شماره موبایل </button>

    </form>
  )
}

export default CheckOtpForm