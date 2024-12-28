import { useQuery } from "@tanstack/react-query";
import { getParentCategories } from "../../services/admin";
import { useState } from "react";
import styles from "./AddPost.module.css";
import { getCookie } from "../../utils/cookie";
import axios from "axios";
import toast from "react-hot-toast";
import PostList from "./PostList";

function AddPost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    amount: "",
    discount: "",
    installments: "",
    category: "",
    images: null,
  });

  const { data } = useQuery(["get-categories"], getParentCategories);

  const changeHandler = (event) => {
    const { name, type, value, files } = event.target;
    if (type === "file") {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: files[0],
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }
    const accessToken = getCookie("accessToken");
    axios
      .post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        toast.success("آگهی با موفقیت ایجاد شد");
      })
      .catch((error) => {
        console.error(error);
        toast.error("مشکلی پیش آمده است");
      });
  };

  return (
    <>
    <form onSubmit={submitHandler} className={styles.form}>
  <h3>افزودن آگهی</h3>

  <label htmlFor="title">عنوان</label>
  <input type="text" name="title" id="title" value={form.title} onChange={changeHandler} />

  <label htmlFor="content">توضیحات</label>
  <textarea name="content" id="content" value={form.content} onChange={changeHandler} />

  <label htmlFor="amount">قیمت</label>
  <input type="number" name="amount" id="amount" value={form.amount} onChange={changeHandler} />

  <label htmlFor="discount">تخفیف</label>
  <input type="number" name="discount" id="discount" value={form.discount} onChange={changeHandler} />

  <label htmlFor="installments">تعداد اقساط</label>
  <input type="number" name="installments" id="installments" value={form.installments} onChange={changeHandler} />

  <label htmlFor="category">دسته بندی</label>
  <select name="category" id="category" value={form.category} onChange={changeHandler}>
    {data?.data.map((category) => (
      <option key={category._id} value={category._id}>
        {category.name}
      </option>
    ))}
  </select>

  <label htmlFor="images">تصاویر</label>
  <input type="file" name="images" id="images" onChange={changeHandler} />

  <button type="submit">ایجاد آگهی</button>
</form>

    <PostList />
    </>
  );
  
}

export default AddPost;
