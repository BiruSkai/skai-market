import { Link } from "react-router-dom";
import "../nav/nav.css"


const DropdownTab = ({name, items}) => {

         const ascItems = items.sort((a, b) => {
                return a.category.localeCompare(b.category)
        })

        console.log("4 ", ascItems)
      
        return ( 
                <div class="dropdown">
                        <span class="dropdown-toggle navItemMd" data-bs-toggle="dropdown" aria-expanded="false">
                                {name}
                        </span>
                        <ul class="dropdown-menu navItemMd categoryTab" autoClose="false">
                                {
                                        ascItems 
                                        ?       ascItems.map(item => {
                                                        return (
                                                                <li index={item.id} className="">
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