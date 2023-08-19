import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

const Announcement = () => {
    const { palette } = useTheme();
    const main = palette.primary.main;
    return (
        <Box padding="1rem">
            <Typography sx={{ color: main }}>
                - There is a Change of ' + ' sign to ' - ' in Ques. 2
            </Typography>
        </Box>
    );
};

export default Announcement;
