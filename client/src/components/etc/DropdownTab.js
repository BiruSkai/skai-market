import { Link } from "react-router-dom";
import "../nav/nav.css"


const DropdownTab = ({name, items}) => {
        console.log("4.1 ", items)
      
        return ( 
                <div class="dropdown">
                        <span class="dropdown-toggle navItemMd" data-bs-toggle="dropdown" aria-expanded="false">
                                {name}
                        </span>
                        <ul class="dropdown-menu navItemMd" autoClose="false">
                                {
                                        items 
                                        ?       items.map(item => {
                                                        return (
                                                                <li index={item.id}>
                                                                        <Link to="" class="dropdown-item">{item.category}</Link>
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