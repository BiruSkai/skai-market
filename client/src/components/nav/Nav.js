import "./nav.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import apiAxios from "../../config/axiosConfig";
import { selectIsLoggedIn, selectCurrentUser, currentUserUpdated, currentUserStatusUpdated, isLoggedInUpdated } from "../../features/users/usersSlice";
import { cartProductsUpdated } from "../../features/cart/cartSlice";
import { customerOrdersUpdated } from "../../features/orders/ordersSlice";


const Nav = () => {

        const dispatch = useDispatch()
        const isLoggedIn = useSelector(selectIsLoggedIn);
        const user = useSelector(selectCurrentUser)
        const history = useHistory()
        console.log("1 ", user, isLoggedIn)
        
        const handleLogout = async () => {
                try {
                        dispatch(currentUserUpdated({})) // Clear current user info from session.
                        dispatch(cartProductsUpdated({})) // Clear cart
                        dispatch(customerOrdersUpdated({})) // Clear orders
                        dispatch(currentUserStatusUpdated("idle"))
                        dispatch(isLoggedInUpdated(false))
                        await apiAxios.post("/auth/logout")
                        history.push("/login")
                } catch (err) {
                        console.log(err)
                }
        }

        return ( 
                <div className="list-unstyled d-flex justify-content-between">
                {/* Sm size */}
                        <div class="dropdown d-md-none">
                                <button class="p-2 border-0 dropdown-toggle bg-light text-primary fw-bold" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="bi bi-list"></i> 
                                </button>
                                <ul class="dropdown-menu navTab" aria-labelledby="dropdownMenuButton1">
                                        <Link to="#" class="dropdown-item">About</Link>
                                        <Link to="#" class="dropdown-item">Address</Link>
                                        <Link to="#" class="dropdown-item">News</Link>
                                        <Link to="#" class="dropdown-item">Categories</Link>
                                </ul>
                        </div> 
                        <div className="p-2 fishIcon d-md-none">Skai Market</div>
                        <div class="d-md-none">
                                <button class="p-2 border-0 dropdown-toggle bg-light text-primary fw-bold" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="bi bi-door-open"></i>
                                </button>
                                <ul class="dropdown-menu navTab" aria-labelledby="dropdownMenuButton1">
                                        { isLoggedIn 
                                                ?       <div className="d-flex flex-column justify-content-centre">
                                                                <p className="mb-0 ps-3">Hello, {user[0].username}</p>
                                                                <Link to="/" class="dropdown-item" onClick={handleLogout}>Logout</Link>  
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
                                        <Link to="#" className="navItemMd">Address</Link>
                                        <Link to="#" className="navItemMd">News</Link>
                                        <Link to="#" className="navItemMd">Categories</Link>
                                </div>
                                <div clsas="d-flex align-items-center">
                                        <Link to="/login" className="navItemMd">Login</Link>
                                        <Link to="/register" className="navItemMd">Register</Link>
                                </div>
                        </div>  
                </div>
         );
}
 
export default Nav;