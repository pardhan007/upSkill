import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import Creator from "../Creator";
import BottomToolbar from "../BottomToolbar";
import RightSection from "./RightSection";
import AllPosts from "../pages/AllPosts";
import Announcement from "../pages/Announcement";
import { useSelector } from "react-redux";
import UserProfile from "../pages/UserProfile";

const MiddleSection = () => {
    const isMobileScreen = useMediaQuery("(max-width:750px)");
    const pagename = useSelector((state) => state.pagename);
    const handlePage = () => {
        if (pagename === "Posts") {
            return <AllPosts />;
        } else if (pagename === "Community Announcement") {
            return <Announcement />;
        } else if (pagename === "Communities") {
            return <RightSection />;
        } else if (pagename === "User Profile") {
            return <UserProfile />;
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
            height="89dvh"
        >
            {/* {pageName !== "communities" && <Creator pageName={pageName} />} */}

            <Box flex={1} overflow="auto" paddingBottom="2rem">
                {handlePage()}
            </Box>
            <BottomToolbar />
        </Box>
    );
};

export default MiddleSection;
