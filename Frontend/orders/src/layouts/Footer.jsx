import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerColumns}>
         
          <div className={styles.footerAbout}>
            <h3>درباره سامانه انتخاب</h3>
            <p>
            سامانه انتخاب به عنوان یک پشتیبان در راستای یکپارچه‌سازی صنعت نرم‌افزاری فعالیت می‌کند. هدف ما ارتقای توان نرم‌افزاری صنایع می باشد که در نهایت به ارتقای سطح کیفی و تخصصی پرسنل منجر خواهد شد. ما در تلاشیم تا با بهره‌برداری از بهترین فناوری‌ها و روش‌ها، به پیشرفت و رشد صنعت کمک کنیم.
            </p>
          </div>

          {/* ستون لینک‌های مفید */}
          <div className={styles.footerLinks}>
            <h3>بخش های سایت</h3>
            <ul>
              <li><a href="/services">خدمات</a></li>
              <li><a href="/surveys">نظرسنجی</a></li>
              <li><a href="#">تماس با ما</a></li>
            </ul>
          </div> 

      </div>
        </div>


      <div className={styles.footerBottom}>
        <p> طراحی شده توسط حمیدرضا شفیعی در مدلل ماهیدشت</p>
      </div>
    </footer>
  );
}

export default Footer;
