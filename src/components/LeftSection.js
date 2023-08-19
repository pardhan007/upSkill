import { Box } from "@mui/material";
import React from "react";
import ProfileCard from "./ProfileCard";
import Navbar from "./Navbar";
import FollowList from "./FollowList";

const LeftSection = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            gap="2rem"
            padding="0rem 0.5rem"
            marginTop="2rem"
        >
            <ProfileCard isloggedIn={true}/>
            <Navbar />
            <FollowList />
        </Box>
    );
};

export default LeftSection;
