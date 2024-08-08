import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiAxios from "../../config/axiosConfig";



export const fetchAllMainAdvertisement= createAsyncThunk("admin/fetchAllMainAdvertisement", async () => {
        try {
                const response = await apiAxios.get("/admin/advertisement")
                const advertisement = {}
                response.data.forEach(item => {
                        advertisement[item.id] = item
                })
                return advertisement
        } catch (err) {
                return err.message
        }
})

const adminAdvertisementSlice = createSlice({
        name: "admin",
        initialState: {
                fetchAllMainAdvertisementStatus: "idle",
                adminAllAdvertisement: {},
                currentAdData: {}
        },
        reducers: {
                adminAdData (state, action) {
                        state.currentAdData = action.payload
                }
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


export const {adminAdData} = adminAdvertisementSlice.actions
export const selectAdminAdData = state => state.adminMainAdvertisement.currentAdData

export const selectAdminAllAdvertisement = state => state.adminMainAdvertisement.adminAllAdvertisement
export const selectAdminAdvertisementById = (state, advertisementId) => state.adminMainAdvertisement.adminAllAdvertisement[advertisementId]
export const selectFetchAdminAllAdvertisementStatus = state => state.adminMainAdvertisement.fetchAllMainAdvertisementStatus

export default adminAdvertisementSlice.reducer
