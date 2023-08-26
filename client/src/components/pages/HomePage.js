import React from "react";
import LeftSection from "../sections/LeftSection";
import MiddleSection from "../sections/MiddleSection";
import RightSection from "../sections/RightSection";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { Header } from "../header/Header";

const HomePage = ({ pageName }) => {
    const isTabletScreen = useMediaQuery("(max-width:1080px)");
    const isMobileScreen = useMediaQuery("(max-width:750px)");
    const mode = useSelector((state) => state.mode);
    return (
        <Box flex={1} sx={{ backgroundColor: mode === "dark" && "#181A1B" }}>
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
