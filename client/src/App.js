import React, { useMemo } from "react";
import HomePage from "./components/pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme";

const App = () => {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/announcement",
            element: <HomePage />,
        },
        {
            path: "/communities",
            element: <HomePage />,
        },
        {
            path: "/profile/:id",
            element: <HomePage />,
        },
    ]);
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <RouterProvider router={router} />
            </ThemeProvider>
        </>
    );
};

export default App;
