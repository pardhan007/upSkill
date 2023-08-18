import { Box } from "@mui/material";
import React from "react";
import ProfileCard from "./ProfileCard";
import Navbar from "./Navbar";
import FollowList from "./FollowList";

const LeftSection = () => {
    return (
        <Box display="flex" flexDirection="column" gap="1rem">
            <ProfileCard />
            <Navbar />
            <FollowList />
        </Box>
    );
};

export default LeftSection;
