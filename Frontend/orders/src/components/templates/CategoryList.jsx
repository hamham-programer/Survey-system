import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getParentCategories, deleteCategory } from "../../services/admin";
import Loader from "../modules/Loader";
import styles from "./categoryList.module.css";
import toast from "react-hot-toast";

function CategoryList() {
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery(["get-categories"], getParentCategories);

    const mutation = useMutation(deleteCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries(["get-categories"]);
        },
        onError: () => {
            alert("مشکلی در حذف دسته‌بندی پیش آمد.");
        }
    });

    const handleDelete = (categoryId) => {
        if (window.confirm("آیا مطمئن هستید که می‌خواهید این دسته‌بندی را حذف کنید؟")) {
            mutation.mutate(categoryId);
        }
    };
    
    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.header}>لیست دسته‌بندی‌ها:</h3>
            {data?.data?.length > 0 ? (
                <ul className={styles.categoryList}>
                    {data?.data.map((category) => (
                        <li key={category._id} className={styles.categoryItem}>
                            <div className={styles.categoryItemContent}>
                                <img src={`/${category.icon}.svg`} alt={`${category.name} icon`} className={styles.icon} />
                                <div>
                                    <span className={styles.categoryTitle}>{category.name}</span> 
                                    <span className={styles.categorySlug}>{category.slug}</span>
                                </div>
                            </div>
                            <div className={styles.categoryItemActions}>
                                <button 
                                    onClick={() => handleDelete(category._id)} 
                                    className={styles.deleteButton}
                                    disabled={mutation.isLoading}
                                >
                                    حذف
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.noCategoryText}>هیچ دسته‌بندی‌ای موجود نیست.</p>
            )}
        </div>
    );
}

export default CategoryList;
