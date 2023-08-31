import React, { useState } from "react";
import FlexBetween from "../customComponents/FlexBetween";
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
import StyledAvatar from "../customComponents/StyledAvatar";
import { useSelector } from "react-redux";

const FollowCard = ({
    id,
    username,
    name,
    edit,
    handleFollow,
    handleUnfollow,
    userPic,
}) => {
    const user = useSelector((state) => state.user);
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
                <StyledAvatar src={userPic} />
                <Box>
                    <Typography fontSize="0.7rem">@{username}</Typography>
                    <Typography
                        sx={{
                            color: main,
                            fontWeight: "500",
                        }}
                    >
                        {name}
                    </Typography>
                </Box>
            </FlexBetween>
            <FlexBetween gap="0.5rem">
                {user?.following.includes(id) ? (
                    <Button onClick={() => handleUnfollow(id)}>
                        <Typography fontSize="0.7rem" sx={{ color: lightblue }}>
                            Remove
                        </Typography>
                    </Button>
                ) : (
                    <Button
                        startIcon={<AddOutlined sx={{ color: lightblue }} />}
                        onClick={() => handleFollow(id)}
                    >
                        <Typography fontSize="0.7rem" sx={{ color: lightblue }}>
                            Follow
                        </Typography>
                    </Button>
                )}
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
