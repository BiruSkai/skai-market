import { Link, useHistory } from "react-router-dom";
import "../nav/nav.css"
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory, selectFetchProductsByCategoryStatus } from "../../features/products/productsSlice";
import { useEffect } from "react";


const DropdownTab = ({name, items}) => {
        const dispatch = useDispatch()
        const history = useHistory()
        const fetchProductCategoriesStatus = useSelector(selectFetchProductsByCategoryStatus)

        // Sorting items a-z
         const ascItems = items.sort((a, b) => {
                return a.localeCompare(b)
        })

        useEffect(() => {
                if (fetchProductCategoriesStatus === "succeeded") {
                        history.push("/products/category")
                }
        }, [fetchProductCategoriesStatus])

        const handleClick = (item) => {
                dispatch(fetchProductsByCategory(item))
        }
      
        return ( 
                <div class="dropdown">
                        <span class="dropdown-toggle navItemMd" data-bs-toggle="dropdown" aria-expanded="false">
                                {name}
                        </span>
                        <ul class="dropdown-menu navItemMd categoryTab" autoClose="false">
                                {
                                        ascItems 
                                        ?       ascItems.map((item) => {
                                                        return (
                                                                <li key={item} className="active">
                                                                        <Link to="" className="dropdown-item" onClick={() => handleClick(item)}>{item}</Link>
                                                                </li>        
                                                        )
                                                })
                                        :       <span>Category is empty</span>
                                }
                        </ul>
                </div>
         );
}
 
export default DropdownTab;