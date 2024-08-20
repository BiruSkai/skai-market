import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiAxios from "../../config/axiosConfig";


export const fetchCurrentCart = createAsyncThunk("cart/fetchCurrentCart", async (loggedOutCart) => {
        const response = await apiAxios("/carts/self", 
                {
                        cart: loggedOutCart
                }
        )
        const cart = {}
        response.data.forEach(cartProduct => {
                cart[cartProduct.product.id]= {
                        quantity: cartProduct.quantity
                }
        })
        return cart
});

export const currentCart = createSlice({
        name:"cart",
        initialState: {
                cartProducts: {},
                fetchCurrentCartStatus:"idle",
                needsCheckoutRedirect:false,
                productAddedMsg:"Slice: Product Added",
                showProductAddedMsg:false
        },
        reducers: {
                // Used to determine if user logging in as part of checkout-flow
                needsCheckoutRedirectUpdated(state, action) {
                        state.needsCheckoutRedirect = action.payload
                },
                // Used for msg showed on alert banner for adding product
                productAddedMsgUpdated(state, action) {
                        state.productAddedMsg = action.payload
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
                                state.fetchCurrentCartStatus = action.payload
                        })
                        .addCase(fetchCurrentCart.rejected, (state, action) => {
                                state.fetchCurrentCartStatus = "failed"
                        })
        }
});


const {
        needsCheckoutRedirect,
        productAddedMsgUpdated
} = cartSlice.actions

export const selectCart = state => state.cart.cartProducts
export const selectFetchCurrentCartStatus = state => state.cart.fetchCurrentCartStatus
export const selectCartNeedsCheckoutRedirect = state => state.cart.needsCheckoutRedirect
export const selectProductAddedMsg = state => state.cart.productAddedMsg
export const selectShowProductAddedMsg = state => state.cart.showProductAddedMsg

export default cartSlice.reducer