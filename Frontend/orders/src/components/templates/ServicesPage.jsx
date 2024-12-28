import { useQuery } from "@tanstack/react-query"
import Main from "./Main"
import Sidebar from "./Sidebar"
import Loader from "../modules/Loader"
import { getAllPost } from "../../services/user"
import { getParentCategories } from "../../services/admin"
import CartPage from "./CartPage"
const style = {
  display: "flex"
}
function ServicesPage() {
    const {data: posts, isLoading: postLoading} = useQuery(["post-list"], getAllPost)
    const { data: categories, isLoading: categoryLoading } = useQuery(["get-categories"], getParentCategories);//برای اینمه تاخیر در نمایش نداشته باشه
  console.log({posts, postLoading});
  
  
    
    return (
    /*   <>
      {postLoading || categoryLoading ? <Loader /> : (
        <div style={style}>
      <Sidebar categories={categories}/>
      <Main posts={posts}/>
  
      </div>
      )}
      
      </> */
<p style={{ color: 'white', fontSize: '30px', textAlign: 'center'  }}>در حال توسعه صفحه خدمات ...</p>
    )
  }
  

export default ServicesPage