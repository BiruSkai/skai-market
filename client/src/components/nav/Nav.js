import "./nav.css";
import DropdownTab from "../etc/DropdownTab";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import apiAxios from "../../config/axiosConfig";
import { selectIsLoggedIn, selectCurrentUser, currentUserUpdated, currentUserStatusUpdated, isLoggedInUpdated } from "../../features/users/usersSlice";
import { cartProductsUpdated, fetchCurrentCartStatusUpdated } from "../../features/cart/cartSlice";
import { customerOrdersUpdated, fetchCustomerOrdersStatusUpdated } from "../../features/orders/ordersSlice";
import { fetchAllProducts, selectAllProducts, selectFetchAllProductsStatus } from "../../features/products/productsSlice";
import { useEffect, useState } from "react";


const Nav = () => {

        const dispatch = useDispatch()
        const [items, setItems] = useState([])
        const isLoggedIn = useSelector(selectIsLoggedIn);
        const user = useSelector(selectCurrentUser)
        const fetchAllProductsStatus = useSelector(selectFetchAllProductsStatus);
        const products = useSelector(selectAllProducts)
        const history = useHistory()
        
        
        console.log("1 ",user, isLoggedIn, fetchAllProductsStatus)

        // Fetch all products if login successful
        useEffect(() => {
                if (isLoggedIn) {
                        dispatch(fetchAllProducts())
                } 
        }, [isLoggedIn, dispatch])

        useEffect(() => {
                const productsList = []

                if (fetchAllProductsStatus === "succeeded") {
                        Object.keys(products).forEach(key => productsList.push(products[key]))
                        
                        setItems(productsList)
                }
        }, [ fetchAllProductsStatus, products, dispatch])

        const handleLogout = async () => {
                try {
                        dispatch(currentUserUpdated({})) // Clear current user info from session.
                        dispatch(currentUserStatusUpdated("idle"))
                        dispatch(cartProductsUpdated({})) // Clear cart
                        dispatch(fetchCurrentCartStatusUpdated("idle"))
                        dispatch(customerOrdersUpdated({})) // Clear orders
                        dispatch(fetchCustomerOrdersStatusUpdated("idle"))
                        dispatch(isLoggedInUpdated(false))
                        
                        const response = await apiAxios.post("/auth/logout")
                        if (response.status === 200) {
                                history.push("/login")
                        } else {
                                console.log("Error logout")
                        }
                } catch (err) {
                        console.log(err)
                }
        }

        return ( 
                <div className="list-unstyled d-flex justify-content-between">
                {/* Sm size */}
                        <div class="dropdown d-md-none" >
                                <button class="p-2 border-0 dropdown-toggle bg-light text-primary fw-bold" data-bs-auto-close="outside" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="bi bi-list"></i> 
                                </button>
                                <ul class="dropdown-menu navTab" aria-labelledby="dropdownMenuButton1">
                                        <Link to="#" class="dropdown-item">About</Link>
                                        <Link to="#" class="dropdown-item">News</Link>
                                        <DropdownTab name="Categories" items={items}/>
                                </ul>
                        </div> 
                        <div className="p-2 fishIcon d-md-none">Skai Market</div>
                        <div class="d-md-none">
                                <button class="p-2 border-0 dropdown-toggle bg-light text-primary fw-bold" data-bs-auto-close="outside" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="bi bi-door-open"></i>
                                </button>
                                <ul class="dropdown-menu navTab" aria-labelledby="dropdownMenuButton1">
                                        { isLoggedIn 
                                                ?       <div className="d-flex flex-column justify-content-centre">
                                                                <p className="mb-0 ps-3 pb-1">Hello, {user[0].username}</p>
                                                                <Link to="/profile" class="dropdown-item">Profile</Link>
                                                                <Link to="" className="dropdown-item" onClick={handleLogout}>Logout</Link>  
                                                        </div> 
                                                :       <div>
                                                                <Link to="/login" class="dropdown-item">Login</Link>
                                                                <Link to="/register" class="dropdown-item">Register</Link>
                                                        </div> 
                                        }
                                </ul>
                        </div>  
                
                {/* Md size */} 
                        <div class=" navMd p-2 d-none d-md-flex justify-content-between ">
                                <div class="d-flex align-items-center">
                                        <div class="fw-bolder border-end border-3 border-dark px-2">Skai Market</div>
                                        <Link to="#" className="navItemMd">About</Link>
                                        <Link to="#" className="navItemMd">News</Link>
                                        <DropdownTab name="Categories" items={items}/>
                                </div>
                                <div clsas="d-flex align-items-center">
                                {
                                        isLoggedIn 
                                        ?       <div>
                                                        <span className="navItemMd">Hello, {user[0].username}</span>
                                                        <Link to="/profile" className="navItemMd">Profile</Link>
                                                        <Link to="" className="navItemMd" onClick={handleLogout}>Logout</Link>
                                                </div> 
                                        :       <div>
                                                        <Link to="/login" className="navItemMd">Login</Link>
                                                        <Link to="/register" className="navItemMd">Register</Link>
                                                </div>
                                }
                                        
                                </div>
                        </div>  
                </div>
         );
}
 
export default Nav;