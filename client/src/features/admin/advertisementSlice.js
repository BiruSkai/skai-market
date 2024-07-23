import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiAxios } from "../../config/axiosConfig";

export const fetchAllMainAdvertisement = createAsyncThunk("/admin/fetchAllMainAdvertisement", async () => {
        const response = await apiAxios.get("admin/advertisement")
        console.log("adSlice: ", response)
        const advertisement = {}
        response.data.forEach(item => {
                advertisement[item.id] = item
        })
        return advertisement
})

export const adverstisementSlice = createSlice({
        name: "adminMainAdvertisement",
        initialState: {
                fetchAllMainAdvertisementStatus: "idle",
                adminAllAdvertisement: {}
        },
        extraReducers: (builder) => {
                // Reducers for fetching adminMainAdverstisement
                builder
                        .addCase(fetchAllMainAdvertisement.pending, (state, action) => {
                                state.fetchAllMainAdvertisementStatus = "loading"
                        })
                        .addCase(fetchAllMainAdvertisement.fulfilled, (state, action) => {
                                state.fetchAllMainAdvertisementStatus = "succeeded"
                                state.adminAllAdvertisement = action.payload
                        })
                        .addCase(fetchAllMainAdvertisement.rejected, (state, action) => {
                                state.fetchAllMainAdvertisementStatus = "failed"
                        })
        }
})


export const selectAdminAllAdvertisement = state => state.adminMainAdvertisement.allAdvertisement
export const selectAdminAdvertisementById = (state, advertisementId) => state.adminMainAdvertisement.adminAllAdvertisement[advertisementId]
export const selectFetchAdminAllAdvertisementStatus = state => state.adminMainAdvertisement.fetchAllMainAdvertisementStatus

export default adverstisementSlice.reducer