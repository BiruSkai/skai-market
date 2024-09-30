import { useSelector } from "react-redux";
import { selectProductCategories } from "../../features/products/productsSlice";

const ProductCategory = () => {
        const productsInCategory = useSelector(selectProductCategories)
        console.log("ProductCategory ", productsInCategory)
        
        return ( 
                <p>Product Category</p>
         );
}
 
export default ProductCategory;