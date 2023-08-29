import { createSlice } from "@reduxjs/toolkit";

// global states
const initialState = {
    mode: "light",
    user: null,
    token: null,
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
        },
    },
});

export const { setMode, setLogin, setLogout } = themeSlice.actions;

export default themeSlice.reducer;
