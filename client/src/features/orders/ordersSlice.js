import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiAxios from "../../config/axiosConfig";


export const fetchCustomerOrders = createAsyncThunk("orders/fetchCustomerOrders", async () => {
        const response = await apiAxios.get("/orders/self")
        const orders = {}

        response.data.forEach(orderProduct => {
                if (!orders[orderProduct.product_id]) {
                        orders[orderProduct.order_id] = {}
                }
                orders[orderProduct.order_id][orderProduct.product_id] = orderProduct       
        }) 

        return orders
})

export const ordersSlice = createSlice({
        name:"orders",
        intialState: {
                customerOrders: {},
                fetchCustomerOrdersStatus: "idle"
        },
        // Clear cart when logging out
        reducers: {
                customerOrdersUpdated (state, action) {
                        state.customerOrders = action.payload
                }
        },
        extraReducers: (builder) => {
                builder
                        .addCase(fetchCustomerOrders.pending, (state, action) => {
                                state.fetchCustomerOrdersStatus = "loading"
                        })
                        .addCase(fetchCustomerOrders.fulfilled, (state, action) => {
                                state.fetchCustomerOrdersStatus = "succeeded"
                                state.customerOrders = action.payload
                        })
                        .addCase(fetchCustomerOrders.rejected, (state, action) => {
                                state.fetchCustomerOrdersStatus = "failed"
                        })
        }
})


export const { customerOrdersUpdated } = ordersSlice.actions
export const selectCustomerOrder = state => state.orders.customerOrders
export const selectOrderById = (state, orderId) => state.orders.customerOrders[orderId]
export const selectFetchCustomerOrderStatus = state => state.orders.fetchCustomerOrdersStatus

export default ordersSlice.reducer