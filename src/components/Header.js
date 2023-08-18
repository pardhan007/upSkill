import React from "react";
import { Box, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";
import StyledAvatar from "./StyledAvatar";
export const Header = ({ pageName }) => {
    return (
        <Box>
            <FlexBetween padding="1rem 1rem" borderBottom="1px solid #FFD1DA">
                <Typography fontSize="1.5rem">Plutonn</Typography>
                <Typography fontSize="1.5rem" fontWeight="700">
                    Community -{" "}
                    {pageName === "posts" ? "Posts" : "Announcement"}
                </Typography>
                <StyledAvatar />
            </FlexBetween>
        </Box>
    );
};
