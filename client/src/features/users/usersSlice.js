import apiAxios from "../../config/axiosConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchCurrentUser = createAsyncThunk("users/fetchCurrentUser", async() => {
        const response = await apiAxios.get("/users/self")
        return response.data
})

const usersSlice = createSlice({
        name:"users",
        initialState: {
                currentUser: {},
                currentUserStatus: "idle",
                isLoggedIn: false
        },
        reducers: {
                currentUserUpdated (state, action) {
                        state.currentUser = action.payload
                },
                currentUserStatusUpdated (state, action) {
                        state.currentUserStatus = action.payload
                },
                isLoggedInUpdated (state, action) {
                        state.isLoggedIn = action.payload
                }
        },
        extraReducers: (builder) => {
                builder
                        .addCase(fetchCurrentUser.pending, (state, action) => {
                                state.currentUserStatus = "loading"
                        })
                        .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                                state.currentUserStatus = "succeeded"
                                state.currentUser = action.payload
                        })
                        .addCase(fetchCurrentUser.rejected, (state, action) => {
                                state.currentUserStatus = "failed"
                        })
        }
})


export const {
        currentUserUpdated,
        currentUserStatusUpdated,
        isLoggedInUpdated
} = usersSlice.actions

export const selectCurrentUser = state => state.persistedReducer.users.currentUser
export const selectCurrentUserStatus = state => state.persistedReducer.users.currentUserStatus
export const selectIsLoggedIn = state => state.persistedReducer.users.isLoggedIn

export default usersSlice.reducer