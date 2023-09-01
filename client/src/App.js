import React, { useMemo } from "react";
import HomePage from "./components/pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme";
import CommunitiesList from "./components/CommunitiesList";
import SearchPage from "./components/pages/SearchPage";
import UserProfile from "./components/pages/UserProfile";

const App = () => {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const router = createBrowserRouter([
        {
            path: "/*",
            element: <HomePage />,
            children: [
                {
                    path: "communities",
                    element: <CommunitiesList />,
                },
                {
                    path: "search",
                    element: <SearchPage />,
                },
                {
                    path: "profile/:id",
                    element: <UserProfile />,
                },
            ],
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
