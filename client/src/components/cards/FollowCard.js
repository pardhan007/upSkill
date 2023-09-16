import React, { useState } from "react";
import FlexBetween from "../customComponents/FlexBetween";
import {
    Box,
    CircularProgress,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
    useTheme,
} from "@mui/material";
import { AddOutlined, Delete, MoreVertOutlined } from "@mui/icons-material";
import StyledAvatar from "../customComponents/StyledAvatar";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { setLoginPage, setUpdatedUser } from "../../state/state";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FollowCard = ({
    id,
    username,
    name,
    edit,
    userPic,
    showFollow,
    postId,
}) => {
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
    const [deleting, setDeleting] = useState(false);

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

                if (!response.ok) {
                    throw new Error("Failed to follow user");
                }

                const updatedProfile = await response.json();
                dispatch(setUpdatedUser({ updatedProfile }));

                toast.success("Followed User", { autoClose: 1000 });
            } catch (error) {
                console.error("Error following user:", error);
                toast.error("Failed to follow user. Please try again.");
            } finally {
                setLoading(false);
            }
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

            if (!response.ok) {
                throw new Error("Failed to unfollow user");
            }

            const updatedProfile = await response.json();
            dispatch(setUpdatedUser({ updatedProfile }));
            toast.success("Unfollowed User", { autoClose: 1000 });
        } catch (error) {
            console.error("Error unfollowing user:", error);
            toast.error("Failed to unfollow user. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePost = async () => {
        setDeleting(true);
        handleClose();

        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}/api/post/deletepost`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ postId: postId }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete post");
            }

            toast.success("Post deleted successfully");
            navigate("");
            navigate(0);
        } catch (error) {
            console.error("Error deleting post:", error);
            toast.error("Failed to delete post. Please try again.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <FlexBetween>
            <FlexBetween
                gap="1rem"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(`/profile/${id}`)}
            >
                <StyledAvatar src={userPic} sx={{ bgcolor: "#FF6969" }} />
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
                            // overflow: "auto",
                            // textOverflow: "unset",
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
                                    Unfollow
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
                    {user?._id === id && edit && (
                        <Box>
                            <IconButton onClick={handleClick}>
                                {deleting ? (
                                    <CircularProgress
                                        color="primary"
                                        size={20}
                                    />
                                ) : (
                                    <MoreVertOutlined />
                                )}
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleDeletePost}>
                                    <ListItemIcon>
                                        <Delete fontSize="small" />
                                    </ListItemIcon>
                                    Delete
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                </FlexBetween>
            )}
        </FlexBetween>
    );
};

export default FollowCard;
