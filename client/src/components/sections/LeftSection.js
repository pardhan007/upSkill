import { Box } from "@mui/material";
import React from "react";
import ProfileCard from "../cards/ProfileCard";
import Navbar from "../Navbar";
import FollowList from "../FollowList";

const LeftSection = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            height="89dvh"
            overflow="auto"
            gap="2rem"
            padding="3rem 0.5rem"
        >
            <ProfileCard />
            <Navbar />
            <FollowList />
        </Box>
    );
};

export default LeftSection;
