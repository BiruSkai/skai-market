import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {
        persistReducer,
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import adminAdvertisementReducer from "./features/admin/advertisementSlice"
import usersReducer from "./features/users/usersSlice"
import cartReducer from "./features/cart/cartSlice"
import ordersReducer from "./features/orders/ordersSlice"
import productsReducer from "./features/products/productsSlice"
 

const persistConfig = {
        key: "root",
        storage
}

const reducer = combineReducers({
        cart: cartReducer,
        users: usersReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
        reducer: {
                persistedReducer,
                adminMainAdvertisement: adminAdvertisementReducer,
                orders: ordersReducer,
                products: productsReducer
        },
        middleware:  (getDefaultMiddleware) =>
                getDefaultMiddleware({
                        serializableCheck: {
                                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                        },
        }),
})