import { GitHub, LinkedIn } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const UserAboutPage = ({ id, logout, user }) => {
    const loggedUser = useSelector((state) => state.user);
    return (
        <Box display="flex" flexDirection="column" gap="0.5rem">
            <Typography
                sx={{
                    textDecoration: "underline",
                    fontSize: "1rem",
                    fontWeight: "600",
                }}
            >
                Social Links
            </Typography>
            <Box>
                <a target="_blank" href={user?.linkedin} rel="noreferrer">
                    <IconButton>
                        <LinkedIn fontSize="large" />
                    </IconButton>
                </a>
                <a target="_blank" href={user?.github} rel="noreferrer">
                    <IconButton>
                        <GitHub fontSize="large" />
                    </IconButton>
                </a>
            </Box>
            {loggedUser?._id === id && (
                <Button
                    sx={{
                        backgroundColor: "#F54E45",
                        color: "white",
                        paddingX: "1rem",
                        boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
                        "&:hover": {
                            backgroundColor: "#F54E45",
                        },
                    }}
                    onClick={logout}
                >
                    Log Out
                </Button>
            )}
        </Box>
    );
};

export default UserAboutPage;
