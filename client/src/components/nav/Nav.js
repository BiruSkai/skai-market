import "./nav.css";
import { Link } from "react-router-dom";


const Nav = () => {
        return ( 
                <div className="list-unstyled d-flex justify-content-between bg-light">
                        <div class="dropdown">
                                <button class="p-2 border-0 dropdown-toggle bg-light text-primary fw-bold" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="bi bi-list"></i> 
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <Link to="#" class="dropdown-item">Home</Link>
                                        <Link to="#" class="dropdown-item">About</Link>
                                        <Link to="#" class="dropdown-item">Address</Link>
                                        <Link to="#" class="dropdown-item">News</Link>
                                </ul>
                        </div> 
                        <div className="p-2 fishIcon">Skai Market</div>
                        <div class="dropdown">
                                <button class="p-2 border-0 dropdown-toggle bg-light text-primary fw-bold" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="bi bi-door-open"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <Link to="#" class="dropdown-item">Login</Link>
                                        <Link to="#" class="dropdown-item">Register</Link>
                                </ul>
                        </div>  
                </div>
         );
}
 
export default Nav;