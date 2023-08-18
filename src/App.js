import React from "react";
import { Box } from "@mui/material";
import { Header } from "./components/Header";
import LeftSection from "./components/LeftSection";
import MiddleSection from "./components/MiddleSection";
import RightSection from "./components/RightSection";
const App = () => {
    return (
        <Box width="90%" margin={"auto"}>
            <Header />
            <Box marginTop="1rem" display="flex">
                <LeftSection />
                <MiddleSection />
                <RightSection />
            </Box>
        </Box>
    );
};

export default App;
