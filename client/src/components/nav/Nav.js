import "./nav.css";
import { Link } from "react-router-dom";


const Nav = () => {
        return ( 
                <div className="list-unstyled d-flex justify-content-between bg-light">
                {/* Sm size */}
                        <div class="dropdown d-md-none">
                                <button class="p-2 border-0 dropdown-toggle bg-light text-primary fw-bold" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="bi bi-list"></i> 
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
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
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <Link to="/login" class="dropdown-item">Login</Link>
                                        <Link to="/register" class="dropdown-item">Register</Link>
                                </ul>
                        </div>  
                
                {/* Md size */} 
                        <div class=" navMd p-2 d-none d-md-flex justify-content-between ">
                                <div class="d-flex align-items-center">
                                        <div class="text-success fw-bolder border-end border-3 border-success px-2 bg-warning">Skai Market</div>
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