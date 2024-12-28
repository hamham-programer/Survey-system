import { useQuery } from "@tanstack/react-query";
import { getParentCategories } from "../../services/admin";
import styles from "./Sidebar.module.css"
function Sidebar({categories}) {
    /* const { data } = useQuery(["get-categories"], getParentCategories);
 */
  return (
    <div className={styles.sidebar}>
        <h4>دسته بندی ها</h4>
        <ul>
            {categories?.data.map((category) =>(
                <li key={category._id}>
                    <img src={`${category.icon}.svg`}/>
                    <p>{category.name}</p>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Sidebar