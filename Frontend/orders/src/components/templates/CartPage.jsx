import { useCart } from '../../router/CartContext';
import { sp } from '../../utils/numbers';
import styles from './CartPage.module.css'; // اضافه کردن فایل CSS ماژول

function CartPage() {
  const { cartItems } = useCart();

  return (
    <div className={styles.container}>
      <h1>لیست خرید</h1>
      {cartItems.map((item) => (
        <div key={item._id} className={styles.cartItem}>
          <img src={item.options.imageUrl} alt={item.options.title} className={styles.image} /> 
          <div className={styles.itemDetails}>
            <p className={styles.title}>{item.options.title}</p>
            <p className={styles.quantity}>مقدار: {item.quantity}</p>
            <p className={styles.amount}>قیمت: {sp(item.amount)}</p>
          </div>
        </div>
      ))}
      <button className={styles.checkoutButton} onClick={() => alert('خرید نهایی شد')}>تایید خرید</button>
    </div>
  );
}

export default CartPage;
