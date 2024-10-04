import "./category.css";
import { useDispatch, useSelector } from "react-redux";
import { 
        fetchProductsByCategory, selectCategoryTheme, selectFetchProductsByCategoryStatus, selectProductsInCategory
 } from "../../features/products/productsSlice";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const ProductCategory = () => {
        const dispatch = useDispatch()
        // const categoryUrl = useParams().category
        const fetchProductsByCategoryStatus = useSelector(selectFetchProductsByCategoryStatus)
        const productsInCategory = useSelector(selectProductsInCategory)
        const categoryTheme = useSelector(selectCategoryTheme)

        const [category, setCategory] = useState("")
        console.log("category.js ", category, categoryTheme, fetchProductsByCategoryStatus, productsInCategory)

        useEffect(() => {

                if (fetchProductsByCategoryStatus === "succeeded") {
                        setCategory(productsInCategory[0].category)
                } else if (fetchProductsByCategoryStatus === "idle" && categoryTheme) {
                        console.log("2")
                        dispatch(fetchProductsByCategory(categoryTheme))
                } else {
                        console.log("test")
                }

        }, [fetchProductsByCategoryStatus, categoryTheme, category])

        return ( 
                <div className="container p2" style={{minHeight:"100vh"}}>
                        <nav aria-label="breadcrumb">
                                <ol class="breadcrumb" style={{fontFamily:"serif", fontSize:"0.6rem", marginTop:"0.4rem", marginBottom:"0.4rem"}}>
                                        <li class="breadcrumb-item"><Link to ="/">Home</Link></li>
                                        <li class="breadcrumb-item active" aria-current="page">Category</li>
                                </ol>
                        </nav>
                        <div style={{fontFamily:"serif"}}>{category}</div>
                        <div className="d-md-flex justify-content-center align-items-center">
                        {
                                productsInCategory.length <= 0 
                                ?       <p>This category is currently empty.</p>
                                :       productsInCategory.map(item => {
                                        return (
                                                <div key={item.id} className="card shadow m-md-2 my-2 col-12 col-md-4">
                                                        <img src={item.img_url} class="card-img-top" alt="item in category" />
                                                        <div class="card-body setCardBody">
                                                                <p class="card-title"><b>Name: </b><span>{item.title}</span></p>
                                                                <div>
                                                                        <span><b>Price: $ </b>{item.price}</span>
                                                                        <span> | <b>Status: </b>{item.status}</span>
                                                                </div>
                                                                <p class="card-text"><b>Description: </b><span>{item.description}</span></p>
                                                                <button class="btn btn-primary setCardBody">Add to cart</button>
                                                        </div>
                                                </div>
                                        )})             
                        }
                        </div> 
                </div>
         );
}
 
export default ProductCategory;