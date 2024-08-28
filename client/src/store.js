import { configureStore } from "@reduxjs/toolkit"
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
 

const persistConfig = {
        key: "root",
        storage
}

const persistedCartReducer = persistReducer(persistConfig, cartReducer)

export const store = configureStore({
        reducer: {
                cart: persistedCartReducer,
                adminMainAdvertisement: adminAdvertisementReducer,
                users: usersReducer,
        },
        middleware:  (getDefaultMiddleware) =>
                getDefaultMiddleware({
                        serializableCheck: {
                        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                        },
        }),
})