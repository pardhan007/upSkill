import React, { useState } from "react";
import FlexBetween from "./FlexBetween";
import {
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    useTheme,
} from "@mui/material";
import { AddOutlined, MoreVertOutlined } from "@mui/icons-material";
import StyledAvatar from "./StyledAvatar";

const FollowCard = ({ username, name, edit }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [follow, setFollow] = useState(false);
    const { palette } = useTheme();
    const main = palette.primary.main;
    const lightblue = palette.primary.lightblue;
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
                    <Typography sx={{ color: main }}>{name}</Typography>
                </Box>
            </FlexBetween>
            <FlexBetween gap="0.5rem">
                <Button
                    startIcon={
                        !follow && <AddOutlined sx={{ color: lightblue }} />
                    }
                    onClick={() => setFollow(!follow)}
                >
                    <Typography fontSize="0.7rem" sx={{ color: lightblue }}>
                        {follow === false ? "Follow" : "Remove"}
                    </Typography>
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
