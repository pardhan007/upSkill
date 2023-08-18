import { Box, Divider } from "@mui/material";
import React from "react";
import PostCard from "./PostCard";
import Creator from "./Creator";
import Announcement from "./Announcement";

const MiddleSection = ({ pageName }) => {
    return (
        <Box
            width="50%"
            padding="0rem 1rem"
            display="flex"
            flexDirection="column"
            gap="0.5rem"
        >
            <Creator pageName={pageName} />
            {pageName === "posts" ? (
                <Box height="68vh" overflow="auto">
                    <PostCard />
                    <Divider />
                    <PostCard />
                    <Divider />
                    <PostCard />
                    <Divider />
                </Box>
            ) : (
                <Box height="68vh" overflow="auto">
                    <Announcement />
                </Box>
            )}
        </Box>
    );
};

export default MiddleSection;
