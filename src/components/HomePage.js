import React from "react";
import { Header } from "./Header";
import LeftSection from "./LeftSection";
import MiddleSection from "./MiddleSection";
import RightSection from "./RightSection";
import { Box } from "@mui/material";

const HomePage = ({ pageName }) => {
    return (
        <Box width="90%" margin={"auto"}>
            <Header pageName={pageName} />
            <Box marginTop="1rem" display="flex">
                <LeftSection />
                <MiddleSection pageName={pageName} />
                <RightSection />
            </Box>
        </Box>
    );
};

export default HomePage;
