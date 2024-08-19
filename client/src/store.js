import { configureStore } from "@reduxjs/toolkit"
import adminAdvertisementReducer from "./features/admin/advertisementSlice"
import usersReducer from "./features/users/usersSlice"
 

export const store = configureStore({
        reducer: {
                adminMainAdvertisement: adminAdvertisementReducer,
                users: usersReducer
        },
        middleware: (getDefaultMiddleware) => 
                getDefaultMiddleware({
                        serializableCheck: false
                })
})