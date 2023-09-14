import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import Creator from "../Creator";
import BottomToolbar from "../BottomToolbar";
import AllPosts from "../pages/AllPosts";
import UserProfile from "../pages/UserProfile";
import SearchPage from "../pages/SearchPage";
import { Route, Routes } from "react-router-dom";
import CommunitiesList from "../CommunitiesList";
import CoursesPage from "../pages/CoursesPage";
import CreatePostCard from "../cards/CreatePostCard";
import CommunitiesPage from "../pages/CommunitiesPage";

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
            <Box flex={1} overflow="auto">
                <Routes>
                    <Route exact path="/" element={<AllPosts />} />
                    <Route
                        exact
                        path="communities"
                        element={<CommunitiesList />}
                    />
                    <Route exact path="profile/:id" element={<UserProfile />} />
                    <Route exact path="search" element={<SearchPage />} />
                    <Route exact path="courses" element={<CoursesPage />} />
                    <Route
                        exact
                        path="createpost"
                        element={<CreatePostCard />}
                    />
                    <Route
                        exact
                        path="/communities/:communityId"
                        element={<CommunitiesPage />}
                    />
                </Routes>
            </Box>
            <BottomToolbar />
        </Box>
    );
};

export default MiddleSection;
