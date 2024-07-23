import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import adminAdvertisementReducer from "./features/admin/advertisementSlice"


export default configureStore({
        reducer: {
                admin: adminAdvertisementReducer
        }
})