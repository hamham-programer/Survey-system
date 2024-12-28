import { useState } from 'react';
import { sp } from "../../utils/numbers";
import styles from "./Main.module.css";
import { useCart } from '../../router/CartContext';
function Main({ posts }) {
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();

  const handleQuantityChange = (postId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  const handleIncreaseQuantity = (postId) => {
    setQuantities((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1,
    }));
  };

  const handleDecreaseQuantity = (postId) => {
    setQuantities((prev) => ({
      ...prev,
      [postId]: Math.max((prev[postId] || 0) - 1, 0),
    }));
  };

  const handleAddToBuyList = (postId, quantity) => {
    const post = posts.data.posts.find(post => post._id === postId);
    addToCart(post, quantity);
  };

  return (
    <div className={styles.container}>
      {posts?.data?.posts.map((post) => (
        <div key={post._id} className={styles.card}>
          <div className={styles.imageContainer}>
            <img
              src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`}
              alt={post.options.title}
              className={styles.image}
            />
          </div>
          <div className={styles.info}>
            <p className={styles.title}>{post.options.title}</p>
            <p className={styles.discount}>تخفیف: {post.options.discount}</p>
            {/* <p>{post.options.content}</p> */}
            <p className={styles.installments}>تعداد اقساط: {post.options.installments}</p>
            <div className={styles.amount}>قیمت:{sp(post.amount)} تومان</div>
            <p className={styles.context}>همکاران برای مشاهده متن کامل آگهی وارد قسمت جزئیات شوید</p>
            <div className={styles.actions}>
              <button
                onClick={() => handleDecreaseQuantity(post._id)}
                className={styles.quantityButton}
              >
                -
              </button>
              <span>{quantities[post._id] || 0}</span>
              <button
                onClick={() => handleIncreaseQuantity(post._id)}
                className={styles.quantityButton}
              >
                +
              </button>
              <a
                href={`/post/${post._id}`}
                className={styles.detailsLink}
              >
                جزئیات
              </a> </div>
              
            </div>
            <div>
            <button
                onClick={() => handleAddToBuyList(post._id, quantities[post._id] || 0)}
                 className={styles.addToBuyListBtn}
               >
                افزودن به لیست خرید
               </button>
              
          </div>
        </div>
      ))}
    </div>
  );
}

export default Main;
