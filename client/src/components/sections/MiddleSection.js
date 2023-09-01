import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import Creator from "../Creator";
import BottomToolbar from "../BottomToolbar";
import AllPosts from "../pages/AllPosts";
import UserProfile from "../pages/UserProfile";
import SearchPage from "../pages/SearchPage";
import { Route, Routes } from "react-router-dom";
import CommunitiesList from "../CommunitiesList";

const MiddleSection = () => {
    const isMobileScreen = useMediaQuery("(max-width:750px)");

    return (
        <Box
            width="20%"
            paddingX={isMobileScreen ? "0rem" : "1rem"}
            display="flex"
            flexDirection="column"
            gap="0.5rem"
            flex={1}
            height="89dvh"
        >
            {/* {pageName !== "communities" && <Creator pageName={pageName} />} */}

            <Box flex={1} overflow="auto" paddingBottom="2rem">
                <Routes>
                    <Route exact path="*" element={<AllPosts />} />
                    <Route
                        exact
                        path="communities"
                        element={<CommunitiesList />}
                    />
                    <Route exact path="profile/:id" element={<UserProfile />} />
                    <Route exact path="search" element={<SearchPage />} />
                </Routes>
            </Box>
            <BottomToolbar />
        </Box>
    );
};

export default MiddleSection;
