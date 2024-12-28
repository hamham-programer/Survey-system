import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../services/user";
import Loader from "../modules/Loader";
import { sp } from "../../utils/numbers";
import styles from "./PostList.module.css";

function PostList() {
    const { data, isLoading } = useQuery(["my-post-list"], getPost);

    return (
        <div className={styles.list}>
            {isLoading ? <Loader /> : (
                <>
                    <h3>آگهی های منتشر شده</h3>
                    {data?.data?.posts.length > 0 ? (
                        data.data.posts.map(post => (
                            <div key={post._id} className={styles.post}>
                                {post.images && post.images.length > 0 ? (
                                    <img 
                                        src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`} 
                                        alt="Post Image" 
                                    />
                                ) : (
                                    <p>تصویری وجود ندارد</p>
                                )}
                                <div>
                                    <p>{post.options.title}</p>
                                    <span>{post.options.content}</span>
                                </div>
                                <div className={styles.price}>
                                    <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                                    <span>{sp(post.amount)} تومان</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className={styles.noPostText}>هیچ آگهی موجود نیست</p>
                    )}
                </>
            )}
        </div>
    );
}

export default PostList;
