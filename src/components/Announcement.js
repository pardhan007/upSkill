import { Box, Typography } from "@mui/material";
import React from "react";

const Announcement = () => {
    return (
        <Box padding="1rem">
            <Typography>
                - There is a Change of ' + ' sign to ' - ' in Ques. 2
            </Typography>
        </Box>
    );
};

export default Announcement;
