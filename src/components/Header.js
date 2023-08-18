import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";
export const Header = () => {
    return (
        <Box>
            <FlexBetween padding="1rem 1rem" borderBottom="1px solid #FFD1DA">
                <Typography fontSize="1.5rem">Plutonn</Typography>
                <Typography fontSize="1.5rem" fontWeight="700">
                    Community - Posts
                </Typography>
                <Avatar />
            </FlexBetween>
        </Box>
    );
};
