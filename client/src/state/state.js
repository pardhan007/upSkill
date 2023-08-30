import { createSlice } from "@reduxjs/toolkit";

// global states
const initialState = {
    mode: "light",
    user: null,
    token: null,
    loginpage: false,
    pagename: "Posts",
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        // contains the functions that modify the global states
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            state.pagename = "Posts";
        },
        setLoginPage: (state) => {
            state.loginpage = state.loginpage === false ? true : false;
        },
        setPageName: (state, action) => {
            state.pagename = action.payload.pagename;
        },
        setUpdatedUser: (state, action) => {
            state.user = action.payload.updatedProfile;
        },
    },
});

export const {
    setMode,
    setLogin,
    setLogout,
    setLoginPage,
    setPageName,
    setUpdatedUser,
} = themeSlice.actions;

export default themeSlice.reducer;
