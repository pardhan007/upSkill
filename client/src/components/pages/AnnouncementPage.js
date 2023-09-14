import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

const AnnouncementPage = ({ announcementArr }) => {
    const { palette } = useTheme();
    const main = palette.primary.main;
    return (
        <Box padding="1rem" textAlign="center">
            {announcementArr.map((text, i) => (
                <Typography sx={{ color: main }} key={i}>
                    - {text}
                </Typography>
            ))}
            {/* <img src="../assets/no-data.svg" style={{ width: "50%" }} /> */}
        </Box>
    );
};

export default AnnouncementPage;
