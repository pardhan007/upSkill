import React from "react";
import HomePage from "./components/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage pageName={"posts"} />,
        },
        {
            path: "/announcement",
            element: <HomePage pageName={"announcement"} />,
        },
    ]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
