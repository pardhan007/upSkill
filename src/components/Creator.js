import {
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import FlexBetween from "./FlexBetween";
import { AddOutlined, MoreVertOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import StyledAvatar from "./StyledAvatar";

const Creator = ({ pageName }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box padding="0rem 1rem">
            <FlexBetween>
                <FlexBetween gap="1rem" sx={{ cursor: "pointer" }}>
                    <StyledAvatar sx={{ width: 50, height: 50 }} />
                    <Box>
                        <Typography fontSize="1.3rem" fontWeight="600">
                            DSA Community
                        </Typography>
                        <Typography sx={{ color: "grey" }}>
                            4142 Members
                        </Typography>
                    </Box>
                </FlexBetween>
                <FlexBetween gap="1rem">
                    <Button startIcon={<AddOutlined />}>
                        <Typography fontSize="0.8rem">Join</Typography>
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
                borderTop="1px solid #FFD1DA"
                borderBottom="1px solid #FFD1DA"
                marginTop="0.5rem"
            >
                <Link to="/">
                    <Button
                        sx={{
                            width: "50%",
                            padding: "1rem",
                            color: pageName === "posts" ? "#F44F45" : "black",
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
                }}
            >
                Join DSA Community
            </Button>
        </Box>
    );
};

export default Creator;
