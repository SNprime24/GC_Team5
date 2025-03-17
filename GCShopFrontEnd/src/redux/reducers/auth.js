import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loader: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userExists: (state, action) => {
            state.user = action.payload;
            state.loader = false;
            localStorage.setItem("user",JSON.stringify(action.payload));
        },
        userNotExists: (state) => {
            state.user = null;
            state.loader = false;
            localStorage.removeItem("user");
        }
    },
});

export default authSlice;
export const { userExists, userNotExists } = authSlice.actions;