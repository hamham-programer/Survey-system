import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styles from "./DetailsPost.module.css"; 
import { getAllPost } from '../../services/user';
import Loader from "../modules/Loader";



function DetailsPost() {
  const { postId } = useParams();
  
  const { data, isLoading, error } = useQuery(["post-details", postId], () => getAllPost(postId));

  if (isLoading) return <Loader />;
  if (error) return <p>خطایی رخ داده است!</p>;

  const post = data?.data;
  if (!post) console.log("errrrrrrrrrrrrrr");
  console.log('Data:', data);
console.log('Data[0]:', data ? data[0] : 'Data is undefined');

  

  return (
    <div>
      <h1>{post.title}</h1>
      
      <img src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`} />
      
      <p>{post.content}</p>
      <p>قیمت: {post.amount} تومان</p>
      <p>تخفیف: {post.discount}%</p>
      <p>تعداد اقساط: {post.installments}</p>
      {/* سایر جزئیات پست */}
    </div>
  );
}

export default DetailsPost;
