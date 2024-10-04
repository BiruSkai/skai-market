import { Link, useHistory } from "react-router-dom";
import "../nav/nav.css"
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory, selectFetchProductsByCategoryStatus, setCategoryTheme } from "../../features/products/productsSlice";
import { useEffect, useState } from "react";


const DropdownTab = ({name, items}) => {
        const dispatch = useDispatch()
        const history = useHistory()
        const fetchProductsByCategoryStatus = useSelector(selectFetchProductsByCategoryStatus)
        const [category, setCategory] = useState("")

        // Sorting items a-z
         const ascItems = items.sort((a, b) => {
                return a.localeCompare(b)
        })

        useEffect(() => {
                if (fetchProductsByCategoryStatus === "succeeded") {
                        history.push(`/products/category/${category}`)
                }
        }, [history, fetchProductsByCategoryStatus, category])

        const handleClick = (item) => {
                setCategory(item)
                dispatch(setCategoryTheme(item))
                dispatch(fetchProductsByCategory(item))
        }
      
        return ( 
                <div class="dropdown" >
                        <span class="dropdown-toggle navItemMd" data-bs-toggle="dropdown" aria-expanded="false">
                                {name}
                        </span>
                        <ul className="dropdown-menu navItemMd categoryTab text-decoration-none" autoClose="false">
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