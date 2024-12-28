import { useState } from "react";
import styles from "./categoryForm.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCategory, getParentCategories } from "../../services/admin";
import toast from "react-hot-toast";
import CategoryList from "./CategoryList";


function CategoryForm() {
    const queryClient = useQueryClient()
    const [form, setForm] = useState({ name: "", slug: "", icon: "", parent: "" });
    const { mutate, isLoading, error, data } = useMutation(addCategory,{
        onSuccess: (data) => {
            if (data.status === 201) {
                toast.success("دسته‌بندی با موفقیت ایجاد شد");
                queryClient.invalidateQueries("get-categories")
                setForm({ name: "", slug: "", icon: "", parent: "" });
            } else {
                toast.error("مشکلی پیش آمده است");
            }
        },
        onError: () => {
            toast.error("مشکلی پیش آمده است");
        }
    });
    const { data: parents, isLoading: parentsLoading } = useQuery(['parentCategories'], getParentCategories);

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const categoryData = {...form};
        if (!categoryData.parent) {
            delete categoryData.parent; // حذف فیلد parent اگر مقدارش خالی است
        }
        if(!categoryData.name || !categoryData.slug || !categoryData.icon) return;
        mutate(categoryData);
        console.log(categoryData);
    };

    return (
        <>
        <form onSubmit={submitHandler} onChange={changeHandler} className={styles.form}>
            <h3>ایجاد دسته‌بندی:</h3>
            <label htmlFor="name">اسم دسته‌بندی</label>
            <input type="text" name="name" id="name" value={form.name}/>

            <label htmlFor="slug">اسلاگ (نام انگلیسی)</label>
            <input type="text" name="slug" id="slug" value={form.slug}/>

            <label htmlFor="icon">آیکون</label>
            <input type="text" name="icon" id="icon" value={form.icon}/>

            <label htmlFor="parent">والد</label>
            <select name="parent" id="parent" value={form.parent}>
                <option value="">بدون والد</option>
                {!parentsLoading && parents?.data?.map((parent) => (
                    <option key={parent._id} value={parent._id}>{parent.name}</option>
                ))}
            </select>

            <button type="submit" disabled={isLoading || parentsLoading}>ایجاد دسته‌بندی</button>
        </form>
        <CategoryList />

        </>
        
    );
}

export default CategoryForm;
