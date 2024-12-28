import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../router/CartContext"; 
import styles from "./Header.module.css";
import { useUser } from "../router/UserContext";
import { logOut } from "../services/user";

function Header() {
  const { userRole } = useUser();
  const { cartItems } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // مرجع برای منوی کشویی
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = async (e) => {
    e.preventDefault(); 
    try {
      await logOut();
      navigate("/auth");
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const location = useLocation();
  const isServicesPage = location.pathname === "/services";

  // بستن منوی کشویی با کلیک خارج از آن
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.links}>
        <Link to="/">خانه</Link>
        <Link to="/services">خدمات</Link>
        <Link to="/surveys">نظرسنجی</Link>
<<<<<<< HEAD
=======

>>>>>>> 6e66e7e62361d68b85a92a198b6383443d420000
      </div>

      <div className={styles.branding}>
        <p>انتخاب | صنعت</p>
      </div>

      <div>
        <div className={styles.profileContainer} ref={dropdownRef}>
          <div className={styles.profile} onClick={toggleDropdown}>
<<<<<<< HEAD
            <img src="public/profile.svg" alt="Profile" />
            <p>انتخاب من</p>
          </div>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link to="/admin">
                <img src="../../public/profile.svg" alt="Profile" />
                پروفایل
              </Link>
              <Link to="/settings">
                <img src="../../public/service.svg" alt="Settings" />
                تنظیمات
              </Link>
              <Link to="/logout" onClick={handleLogout}>
                <img src="../../public/home.svg" alt="Logout" />
                خروج
              </Link>
=======
            <img src="/profile.svg" alt="Profile" />
            <p>مدلل من</p>
          </div>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link to="/admin"><img src="/profile.svg" alt="Profile" />پروفایل</Link>
              <Link to="/settings"><img src="/service.svg" alt="Settings" />تنظیمات</Link>
              <Link to="/logout" onClick={handleLogout}><img src="/home.svg" alt="Logout" />خروج</Link>
>>>>>>> 6e66e7e62361d68b85a92a198b6383443d420000
            </div>
          )}
          {isServicesPage && (
            <Link to="/cart" className={styles.cartIcon}>
              <i className="fa-solid fa-cart-shopping"></i>
              {totalItems > 0 && <span className={styles.cartCount}>{totalItems}</span>}
            </Link>
          )}
        </div>
        {userRole === "ADMIN" && (
          <Link to="/dashboard" className={styles.button}>
            ثبت آگهی
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
