import { Box, Divider } from "@mui/material";
import React from "react";
import PostCard from "./PostCard";
import Creator from "./Creator";

const MiddleSection = () => {
    return (
        <Box
            width="50%"
            padding="0rem 1rem"
            display="flex"
            flexDirection="column"
            gap="0.5rem"
        >
            <Creator />
            <Box height="69vh" overflow="auto">
                <PostCard />
                <Divider />
                <PostCard />
                <Divider />
                <PostCard />
                <Divider />
            </Box>
        </Box>
    );
};

export default MiddleSection;
