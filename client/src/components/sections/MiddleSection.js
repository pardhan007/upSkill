import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import Creator from "../Creator";
import BottomToolbar from "../BottomToolbar";
import RightSection from "./RightSection";
import AllPosts from "../pages/AllPosts";
import Announcement from "../pages/Announcement";

const MiddleSection = ({ pageName }) => {
    const isMobileScreen = useMediaQuery("(max-width:750px)");
    const handlePage = () => {
        if (pageName === "posts") {
            return <AllPosts />;
        } else if (pageName === "announcement") {
            return <Announcement />;
        } else if (pageName === "communities") {
            return <RightSection />;
        }
    };

    return (
        <Box
            width="20%"
            paddingX={isMobileScreen ? "0rem" : "1rem"}
            display="flex"
            flexDirection="column"
            gap="0.5rem"
            flex={1}
        >
            {pageName !== "communities" && <Creator pageName={pageName} />}

            <Box height="67.5vh" overflow="auto">
                {handlePage()}
            </Box>
            <BottomToolbar />
        </Box>
    );
};

export default MiddleSection;
