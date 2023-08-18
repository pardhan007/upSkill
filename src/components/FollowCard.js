import React, { useState } from "react";
import FlexBetween from "./FlexBetween";
import {
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import { AddOutlined, MoreVertOutlined } from "@mui/icons-material";
import StyledAvatar from "./StyledAvatar";

const FollowCard = ({ username, name, edit }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <FlexBetween>
            <FlexBetween gap="1rem" sx={{ cursor: "pointer" }}>
                <StyledAvatar />
                <Box>
                    <Typography fontSize="0.7rem">{username}</Typography>
                    <Typography>{name}</Typography>
                </Box>
            </FlexBetween>
            <FlexBetween gap="0.5rem">
                <Button startIcon={<AddOutlined />}>
                    <Typography fontSize="0.7rem">Follow</Typography>
                </Button>
                {edit && (
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
                )}
            </FlexBetween>
        </FlexBetween>
    );
};

export default FollowCard;
