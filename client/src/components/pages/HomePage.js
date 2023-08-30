import React from "react";
import LeftSection from "../sections/LeftSection";
import MiddleSection from "../sections/MiddleSection";
import RightSection from "../sections/RightSection";
import { Box, useMediaQuery } from "@mui/material";
import { Header } from "../header/Header";
import LoginSignupPage from "../auth/LoginSignupPage";
import { useSelector } from "react-redux";

const HomePage = () => {
    const isTabletScreen = useMediaQuery("(max-width:1080px)");
    const isMobileScreen = useMediaQuery("(max-width:750px)");
    const mode = useSelector((state) => state.mode);
    const loginpage = useSelector((state) => state.loginpage);

    return (
        <Box
            height="100dvh"
            sx={{ backgroundColor: mode === "dark" && "#181A1B" }}
        >
            {loginpage && <LoginSignupPage />}
            <Box paddingX={isTabletScreen ? "0.5rem" : "5rem"}>
                <Header />
                <Box marginTop="1rem" display="flex">
                    {!isMobileScreen && <LeftSection />}
                    <MiddleSection />
                    {!isTabletScreen && <RightSection />}
                </Box>
            </Box>
        </Box>
    );
};

export default HomePage;
