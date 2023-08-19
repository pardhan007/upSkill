import {
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import React, { useState } from "react";
import FlexBetween from "./customComponents/FlexBetween";
import { AddOutlined, MoreVertOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import StyledAvatar from "./customComponents/StyledAvatar";
import { useSelector } from "react-redux";

const Creator = ({ pageName }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [join, setJoin] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const isMobileScreen = useMediaQuery("(max-width:750px)");
    const mode = useSelector((state) => state.mode);
    const { palette } = useTheme();
    const main = palette.primary.main;
    const lightblue = palette.primary.lightblue;
    return (
        <Box paddingX={isMobileScreen ? "0.1rem" : "1rem"}>
            <FlexBetween>
                <FlexBetween gap="1rem" sx={{ cursor: "pointer" }}>
                    <StyledAvatar sx={{ width: 50, height: 50 }} />
                    <Box>
                        <Typography
                            fontSize={isMobileScreen ? "0.9rem" : "1.3rem"}
                            fontWeight="600"
                            sx={{ color: main }}
                        >
                            DSA Community
                        </Typography>
                        <Typography
                            fontSize={isMobileScreen ? "0.7rem" : "1rem"}
                            sx={{ color: "grey" }}
                        >
                            4142 Members
                        </Typography>
                    </Box>
                </FlexBetween>
                <FlexBetween gap={isMobileScreen ? "0rem" : "1rem"}>
                    <Button
                        startIcon={
                            !join && <AddOutlined sx={{ color: lightblue }} />
                        }
                        onClick={() => setJoin(!join)}
                    >
                        <Typography
                            fontSize={isMobileScreen ? "0.7rem" : "0.8rem"}
                            sx={{ color: lightblue }}
                        >
                            {join ? "Leave" : "Join"}
                        </Typography>
                    </Button>
                    <Box>
                        <IconButton onClick={handleClick}>
                            <MoreVertOutlined />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>info</MenuItem>
                        </Menu>
                    </Box>
                </FlexBetween>
            </FlexBetween>
            <Box
                borderTop={
                    mode === "dark" ? "1px solid #3F2E3E" : "1px solid #FFD1DA"
                }
                borderBottom={
                    mode === "dark" ? "1px solid #3F2E3E" : "1px solid #FFD1DA"
                }
                marginTop="0.5rem"
            >
                <Link to="/">
                    <Button
                        sx={{
                            width: "50%",
                            padding: "1rem",
                            color:
                                pageName === "posts"
                                    ? "#F44F45"
                                    : mode === "dark"
                                    ? "D7D4CF"
                                    : "black",
                            "&:hover": {
                                backgroundColor: "#FAF3F0",
                            },
                        }}
                    >
                        <Typography fontSize="0.8rem" fontWeight="600">
                            Posts
                        </Typography>
                    </Button>
                </Link>
                <Link to="/announcement">
                    <Button
                        sx={{
                            width: "50%",
                            padding: "1rem",
                            color:
                                pageName === "announcement"
                                    ? "#F44F45"
                                    : mode === "dark"
                                    ? "D7D4CF"
                                    : "black",
                            "&:hover": {
                                backgroundColor: "#FAF3F0",
                            },
                        }}
                    >
                        <Typography fontSize="0.8rem" fontWeight="600">
                            Announcement
                        </Typography>
                    </Button>
                </Link>
            </Box>
            {!isMobileScreen && (
                <Button
                    sx={{
                        width: "100%",
                        textAlign: "center",
                        padding: "0.7rem",
                        backgroundColor: "#F44F45",
                        color: "white",
                        borderRadius: "2rem",
                        marginTop: "0.5rem",
                        "&:hover": {
                            backgroundColor: "#F44F45",
                        },
                        boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.75)",
                        fontWeight: "600",
                    }}
                >
                    Join DSA Community
                </Button>
            )}
        </Box>
    );
};

export default Creator;
