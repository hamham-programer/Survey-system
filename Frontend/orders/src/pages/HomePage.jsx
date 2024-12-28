import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

/* import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'; */
const images = [
  '/ghoncheh+.png',
  '/naz.jpg',
  '/kalhar.png',
  '/4.png',
   '/letka.png',
  '/Asset 1 (2).png',
  '/mahidasht.png',
  '/Dalahoo 1.png',
  '/gelare.png',
  '/ke.jfif',

];

function HomePage() {
  return (
    <>
      <div className={styles.homePage}>
        <img src="/mahidasht.png" alt="تصویر سمت چپ" className={styles.leftImage} />
        <div className={styles.textContainer}>
          <h1 className={styles.heading}> کشت و صنعت مدلل ماهیدشت</h1>
          <p className={styles.subheading}>نوآور در فناوری و پیشگام در تحول دیجیتال</p>
        </div>
        <div className={styles.buttonContainer}>
          <Link to="/services" className={styles.buttonLink}>
            <button className={styles.button}>خدمات</button>
          </Link>
          <Link to="/surveys" className={styles.buttonLink}>
            <button className={styles.button}>نظرسنجی</button>
          </Link>
        </div>
        <img src="/modall-new.png" alt="تصویر سمت راست" className={styles.rightImage} />
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={7} 
        loop={true}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        speed={1000}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, Navigation]} 
        className={styles.swiper}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.contactSection}>
        <p class={styles.contactTitle}>راه‌های ارتباطی با شرکت </p>
        <div className={styles.socialLinks}>
          <a href="https://www.instagram.com/nazgol_oil?igsh=amlpM2toY3RkeGV5" className={styles.socialIconInstagram}><i class="fa-brands fa-instagram"></i></a>
          <a href="https://ir.linkedin.com/company/modalal" className={styles.socialIconLinkedin}><i class="fa-brands fa-linkedin"></i></a>
          <a href="https://chat.whatsapp.com/EMwaGckJjLV42iBFt1hY6T" className={styles.socialIconWhatsapp}><i class="fa-brands fa-whatsapp"></i></a>
          <a href="#" className={styles.socialIconTelegram}><i class="fa-brands fa-telegram"></i></a>
          <a href="#" className={styles.socialIconComment}><i class="fa-solid fa-circle-check"></i></a>
          <a href="mailto:y.amiri@modalalco.com" className={styles.socialIconEmail}><i class="fa-regular fa-envelope"></i></a>
        </div>
     </div>

    </>
  );
}

export default HomePage;
