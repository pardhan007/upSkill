import { Box } from "@mui/material";
import React from "react";
import ProfileCard from "../cards/ProfileCard";
import Navbar from "../Navbar";
import AllUserList from "../AllUserList";
import Widget from "../customComponents/Widget";

const LeftSection = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            height="89dvh"
            overflow="auto"
            gap="2rem"
            padding="3rem 0.5rem"
            width={300}
        >
            <Widget>
                <ProfileCard />
            </Widget>
            <Widget>
                <Navbar />
            </Widget>
            <Widget>
                <AllUserList />
            </Widget>
        </Box>
    );
};

export default LeftSection;
