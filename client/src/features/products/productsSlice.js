import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiAxios from "../../config/axiosConfig";

export const fetchAllProducts = createAsyncThunk("products/fetchAllProducts", async () => {
        const response = await apiAxios.get("/products")
        const products = {}
        response.data.forEach(product => {
                products[product.id] = product
        })

        return products
})

export const fetchProductsByCategory = createAsyncThunk("products/fetchProductsByCategory", async (category) => {
        
        const response = await apiAxios.get(`/products/${category}`)
        console.log("pr.Slic: ", typeof(response.data), response.data)
        return response.data
})

export const productsSlice = createSlice({
        name: "products",
        initialState: {
                allProducts: {},
                productCategories: {},
                fetchAllProductsStatus: "idle",
                fetchProductsByCategoryStatus: "idle"
        },
        extraReducers: (builder) => {
        // Reduces for fetching products
                builder 
                        .addCase(fetchAllProducts.pending, (state, action) => {
                                state.fetchAllProductsStatus = "loading"
                        })
                        .addCase(fetchAllProducts.fulfilled, (state, action) => {
                                state.fetchAllProductsStatus = "succeeded"
                                state.allProducts = action.payload
                        })
                        .addCase(fetchAllProducts.rejected, (state, action) => {
                                state.fetchAllProductsStatus = "failed"
                        })
                        .addCase(fetchProductsByCategory.pending, (state, action) => {
                                state.fetchProductsByCategoryStatus = "loading"
                        })
                        .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                                state.fetchProductsByCategoryStatus = "succeeded"
                                state.productCategories = action.payload
                        })
                        .addCase(fetchProductsByCategory.rejected, (state, action) => {
                                state.fetchProductsByCategoryStatus = "failed"
                        })
        }
})


export const selectAllProducts = state => state.products.allProducts
export const selectProductCategories = state => state.products.productCategories
export const selectProductById = (state, productId) => state.products.allProducts[productId]
export const selectFetchAllProductsStatus = state => state.products.fetchAllProductsStatus
export const selectFetchProductsByCategoryStatus = state => state.products.fetchProductsByCategoryStatus

export default productsSlice.reducer 