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
import { LoadingButton } from "@mui/lab";

const FollowCard = ({
    id,
    username,
    name,
    edit,
    handleFollow,
    handleUnfollow,
    userPic,
    handleProfileClick,
}) => {
    const user = useSelector((state) => state.user);
    const [anchorEl, setAnchorEl] = useState(null);
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
            <FlexBetween
                gap="1rem"
                sx={{ cursor: "pointer" }}
                onClick={() => handleProfileClick(id)}
            >
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
                    <LoadingButton
                        onClick={() => handleUnfollow(id)}
                        // loading={loading}
                        sx={{
                            fontSize: "0.7rem",
                            color: lightblue,
                        }}
                    >
                        Remove
                    </LoadingButton>
                ) : (
                    <LoadingButton
                        startIcon={<AddOutlined sx={{ color: lightblue }} />}
                        onClick={() => handleFollow(id)}
                        // loading={loading}
                        sx={{
                            fontSize: "0.7rem",
                            color: lightblue,
                        }}
                    >
                        Follow
                    </LoadingButton>
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
