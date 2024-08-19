import apiAxios from "../../config/axiosConfig";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");


export const fetchCurrentUser = createAsyncThunk("users/fetchCurrentUser", async() => {
        const response = await apiAxios("/users/self")
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

export const selectCurrentUser = state => state.users.currentUser
export const selectCurrentUserStatus = state => state.users.currentUserStatus
export const selectIsLoggedIn = state => state.users.isLoggedIn

export default usersSlice.reducer