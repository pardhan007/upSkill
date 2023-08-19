import React from "react";
import { Header } from "./Header";
import LeftSection from "./LeftSection";
import MiddleSection from "./MiddleSection";
import RightSection from "./RightSection";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const HomePage = ({ pageName }) => {
    const isTabletScreen = useMediaQuery("(max-width:1080px)");
    const isMobileScreen = useMediaQuery("(max-width:750px)");
    const mode = useSelector((state) => state.mode);
    return (
        <Box flex={1}>
            <Box paddingX={isTabletScreen ? "0.5rem" : "5rem"}>
                <Header pageName={pageName} />
                <Box marginTop="1rem" display="flex">
                    {!isMobileScreen && <LeftSection />}
                    <MiddleSection pageName={pageName} />
                    {!isTabletScreen && <RightSection />}
                </Box>
            </Box>
        </Box>
    );
};

export default HomePage;
