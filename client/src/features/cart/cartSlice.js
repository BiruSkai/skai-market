import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiAxios from "../../config/axiosConfig";


export const fetchCurrentCart = createAsyncThunk("cart/fetchCurrentCart", async (loggedOutCart) => {
        const response = await apiAxios.post("/carts/self", 
                {
                        cart: loggedOutCart
                }
        )
        
        const cart = {}
        response.data.forEach(cartProduct => {
                cart[cartProduct.id]= {
                        quantity: cartProduct.quantity
                }
        })
        
        return cart
});

export const addProductToCart = createAsyncThunk("cart/addProductToCart", async (cartProduct, {getState}) => {
        if (getState().users.isLoggedIn) {
                await apiAxios.post("/carts/self/product", cartProduct)
        }
        return cartProduct
})

export const removeProductFromCart = createAsyncThunk("cart/removeProductFromCart", async (product, {getState}) => {
        if (getState().users.isLoggedIn) {
                await apiAxios.delete("/carts/self/product", { data: product})
        }
        return product 
})

export const changeProductQuantity = createAsyncThunk("cart/changeProductQuantity", async (product, {getState}) => {
        if (getState().users.isLoggedIn) {
                await apiAxios.put("/carts/self/product", { data: product})
        }
        return product 
})

export const checkoutCart = createAsyncThunk("cart/checkoutCart", async () => {
        const response = await apiAxios.post("/carts/self/checkout")
        return response.data
})


export const cartSlice = createSlice({
        name:"cart",
        initialState: {
                cartProducts: {},
                fetchCurrentCartStatus: "idle",
                addProductToCartStatus: "idle",
                removeProductFromCartStatus: "idle",
                changeProductQuantityStatus: "idle",
                checkoutCartStatus: "idle",
                needsCheckoutRedirect:false,
                productAddedMsg:"Slice: Product Added",
                showProductAddedMsg:false
        },
        reducers: {
                cartProductsUpdated(state, action) {
                        state.cartProducts = action.payload
                },
                // Used to determine if user logging in as part of checkout-flow
                needsCheckoutRedirectUpdated(state, action) {
                        state.needsCheckoutRedirect = action.payload
                },
                // Used for msg showed on alert banner for adding product
                productAddedMsgUpdated(state, action) {
                        state.productAddedMsg = action.payload
                },
                // Used to show alert banner when product added to cart
                showProductAddedMsgUpdated(state, action) {
                        state.showProductAddedMsg = action.payload
                }
        },
        extraReducers: (builder) => {
                builder
                // Reducers for fetching cart
                        .addCase(fetchCurrentCart.pending, (state, action) => {
                                state.fetchCurrentCartStatus = "loading"
                        })
                        .addCase(fetchCurrentCart.fulfilled, (state, action) => {
                                state.fetchCurrentCartStatus = "succeeded"
                                state.cartProducts = action.payload
                        })
                        .addCase(fetchCurrentCart.rejected, (state, action) => {
                                state.fetchCurrentCartStatus = "failed"
                        })
                // Reducers for adding product in cart
                        .addCase(addProductToCart.pending, (state, action) => {
                                state.addProductToCartStatus = "loading"
                        })
                        .addCase(addProductToCart.fulfilled, (state, action) => {
                                state.addProductToCartStatus = "succeeded"
                                state.cartProducts[action.payload.product_id] = action.payload
                        })
                        .addCase(addProductToCart.rejected, (state, action) => {
                                state.addProductToCartStatus = "failed"
                        })
                // Reducer for removing product in cart
                        .addCase(removeProductFromCart.pending, (state, action) => {
                                state.removeProductFromCartStatus = "loading"
                        })
                        .addCase(removeProductFromCart.fulfilled, (state, action) => {
                                state.removeProductFromCartStatus = "succeeded"
                                delete state.cartProducts[action.payload.product_id]
                        })
                        .addCase(removeProductFromCart.rejected, (state, action) => {
                                state.removeProductFromCartStatus = "failed"
                        })
                // Reducer for changing product's quantity in cart
                        .addCase(changeProductQuantity.pending, (state, action) => {
                                state.changeProductQuantityStatus = "loading"
                        })
                        .addCase(changeProductQuantity.fulfilled, (state, action) => {
                                state.changeProductQuantityStatus = "succeeded"
                                state.cartProducts[action.payload.product_id] = action.payload.quantity 
                        })
                        .addCase(changeProductQuantity.rejected, (state, action) => {
                                state.changeProductQuantityStatus = "failed"
                        })
                // Reducer for tracking status of order's placement
                        .addCase(checkoutCart.pending, (state, action) => {
                                state.checkoutCartStatus = "loading"
                        })
                        .addCase(checkoutCart.fulfilled, (state, action) => {
                                state.checkoutCartStatus = "succeeded"
                        })
                        .addCase(checkoutCart.rejected, (state, action) => {
                                state.checkoutCartStatus = "failed"
                        })
        }
});


export const {
        cartProductsUpdated,
        needsCheckoutRedirectUpdated,
        productAddedMsgUpdated,
        showProductAddedMsgUpdated
} = cartSlice.actions

export const selectCart = state => state.persistedReducer.cart.cartProducts
export const selectFetchCurrentCartStatus = state => state.persistedReducer.cart.fetchCurrentCartStatus
export const selectNeedsCheckoutRedirect = state => state.persistedReducer.cart.needsCheckoutRedirect
export const selectProductAddedMsg = state => state.persistedReducer.cart.productAddedMsg
export const selectShowProductAddedMsg = state => state.persistedReducer.cart.showProductAddedMsg

export default cartSlice.reducer