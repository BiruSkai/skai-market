import { configureStore } from "@reduxjs/toolkit"
import adminAdvertisementReducer from "./features/admin/advertisementSlice"


export const store = configureStore({
        reducer: {
                adminMainAdvertisement: adminAdvertisementReducer
        }
})