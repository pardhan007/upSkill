import { createSlice } from "@reduxjs/toolkit";

// global states
const initialState = {
    mode: "light",
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        // contains the functions that modify the global states
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
    },
});

export const { setMode } = themeSlice.actions;

export default themeSlice.reducer;
