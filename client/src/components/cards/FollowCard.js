import React, { useState } from "react";
import FlexBetween from "../customComponents/FlexBetween";
import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    useTheme,
} from "@mui/material";
import { AddOutlined, MoreVertOutlined } from "@mui/icons-material";
import StyledAvatar from "../customComponents/StyledAvatar";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { setLoginPage, setUpdatedUser } from "../../state/state";

const FollowCard = ({ id, username, name, edit, userPic, showFollow }) => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [anchorEl, setAnchorEl] = useState(null);
    const { palette } = useTheme();
    const main = palette.primary.main;
    const lightblue = palette.primary.lightblue;
    const open = Boolean(anchorEl);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFollow = async (id) => {
        if (!user) {
            dispatch(setLoginPage());
        } else {
            setLoading(true);
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_SERVER}/api/user/follow`,
                    {
                        method: "PATCH",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id: id }),
                    }
                );

                if (response.status === 200) {
                    const updatedProfile = await response.json();
                    dispatch(setUpdatedUser({ updatedProfile }));
                }
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }
    };
    const handleUnfollow = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}/api/user/unfollow`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: id }),
                }
            );
            if (response.status === 200) {
                const updatedProfile = await response.json();
                dispatch(setUpdatedUser({ updatedProfile }));
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <FlexBetween>
            <FlexBetween
                gap="1rem"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(`/profile/${id}`)}
            >
                <StyledAvatar src={userPic} />
                <Box>
                    <Typography
                        fontSize="0.7rem"
                        sx={{
                            color: main,
                        }}
                    >
                        @{username}
                    </Typography>
                    <Typography
                        sx={{
                            color: main,
                            fontWeight: "600",
                        }}
                    >
                        {name}
                    </Typography>
                </Box>
            </FlexBetween>
            {showFollow === false ? (
                <></>
            ) : (
                <FlexBetween gap="0.5rem">
                    {user?._id !== id && (
                        <Box>
                            {user?.following.includes(id) ? (
                                <LoadingButton
                                    onClick={() => handleUnfollow(id)}
                                    loading={loading}
                                    sx={{
                                        fontSize: "0.7rem",
                                        color: lightblue,
                                    }}
                                >
                                    Remove
                                </LoadingButton>
                            ) : (
                                <LoadingButton
                                    startIcon={
                                        !loading && (
                                            <AddOutlined
                                                sx={{ color: lightblue }}
                                            />
                                        )
                                    }
                                    onClick={() => handleFollow(id)}
                                    loading={loading}
                                    sx={{
                                        fontSize: "0.7rem",
                                        color: lightblue,
                                    }}
                                >
                                    Follow
                                </LoadingButton>
                            )}
                        </Box>
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
            )}
        </FlexBetween>
    );
};

export default FollowCard;
