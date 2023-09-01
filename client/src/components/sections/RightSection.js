import {
    Box,
    IconButton,
    InputBase,
    Typography,
    useMediaQuery,
} from "@mui/material";
import React from "react";
import FlexBetween from "../customComponents/FlexBetween";
import { Search } from "@mui/icons-material";
import BottomToolbar from "../BottomToolbar";
import CommunitiesList from "../CommunitiesList";

const RightSection = () => {
    const isTabletScreen = useMediaQuery("(max-width:1080px)");
    return (
        <Box width={isTabletScreen ? "100%" : "26%"} minWidth="280px">
            <Box>
                <FlexBetween
                    borderRadius="50px"
                    gap="2rem"
                    padding="0rem 0.7rem"
                    border="1px solid #FFD1DA"
                >
                    <InputBase
                        fullWidth
                        placeholder="Search Joined Community"
                    />
                    <IconButton>
                        <Search />
                    </IconButton>
                </FlexBetween>
            </Box>
            <Typography fontWeight="600" marginTop="1rem">
                Popular Communities
            </Typography>
            <CommunitiesList />
            <BottomToolbar />
        </Box>
    );
};

export default RightSection;
