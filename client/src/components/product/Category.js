import { useSelector } from "react-redux";
import { selectProductCategories } from "../../features/products/productsSlice";

const ProductCategory = () => {
        const productsInCategory = useSelector(selectProductCategories)
        console.log("ProductCategory ", productsInCategory)
        const category = productsInCategory[0].category
        
        return ( 
                <div className="position-relative container">
                        <h4 className="py-2 border-bottom" style={{fontFamily:"serif"}}>{category}</h4>
                        {
                                productsInCategory.length <= 0 
                                ?       <p>This category is currently empty.</p>
                                :       productsInCategory.map(item => {
                                        return (
                                                <div key={item.id} class="card m-2" style={{width: "18rem"}}>
                                                        <img src={item.img_url} class="card-img-top" alt="item in product category" />
                                                        <div class="card-body">
                                                                <p class="card-title fs-6"><b>Name: </b><span>{item.title}</span></p>
                                                                <div className="fs-6">
                                                                        <span><b>Price: $ </b>{item.price}</span>
                                                                        <span> | <b>Status: </b>{item.status}</span>
                                                                </div>
                                                                <p class="card-text fs-6"><b>Description: </b><span>{item.description}</span></p>
                                                                <a href="#" class="btn btn-primary">Add to cart</a>
                                                        </div>
                                                </div>
                                        )})

                                       
                                               
                                        
                        }
                       
                        
                </div>
         );
}
 
export default ProductCategory;