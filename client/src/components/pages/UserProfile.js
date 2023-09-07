import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import FlexBetween from "../customComponents/FlexBetween";
import StyledAvatar from "../customComponents/StyledAvatar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    ArrowBackSharp,
    DynamicFeed,
    EditOutlined,
    GitHub,
    LinkedIn,
    Person,
} from "@mui/icons-material";
import EditProfile from "./EditProfile";
import { setLogout } from "../../state/state";

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const token = useSelector((state) => state.token);
    const loggedUser = useSelector((state) => state.user);
    const { palette } = useTheme();
    const main = palette.primary.main;
    const bordercolor = palette.primary.bordercolor;
    const [editOpen, setEditOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const getUser = async () => {
                const response = await fetch(
                    `${process.env.REACT_APP_SERVER}/api/user/profile/${id}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                setUser(data);
            };
            getUser();
        }
    }, [id]);
    // console.log(user);
    if (!user) return null;

    const logout = () => {
        dispatch(setLogout());
        navigate("/");
    };

    return (
        <Box display="flex" flexDirection="column" padding="0.5rem" gap="1rem">
            <FlexBetween>
                <FlexBetween gap="1rem" sx={{ cursor: "pointer" }}>
                    <StyledAvatar
                        src={user.userPic}
                        sx={{ width: 50, height: 50 }}
                    />
                    <Box>
                        <Typography fontSize="0.8rem">
                            @{user?.username}
                        </Typography>
                        <Typography
                            sx={{
                                color: main,
                                fontWeight: "600",
                                fontSize: "1.2rem",
                            }}
                        >
                            {user?.name}
                        </Typography>
                    </Box>
                </FlexBetween>
                {loggedUser?._id === id && (
                    <Button
                        startIcon={
                            editOpen ? <ArrowBackSharp /> : <EditOutlined />
                        }
                        sx={{
                            backgroundColor: "#F54E45",
                            color: "white",
                            paddingX: "1rem",
                            "&:hover": {
                                backgroundColor: "#F54E45",
                            },
                        }}
                        onClick={() => setEditOpen(!editOpen)}
                    >
                        {editOpen ? "back" : "Edit"}
                    </Button>
                )}
            </FlexBetween>
            <FlexBetween>
                <Box textAlign="center">
                    <Typography fontWeight="600">0</Typography>
                    <Typography fontWeight="400">Posts</Typography>
                </Box>
                <Box textAlign="center">
                    <Typography fontWeight="600">
                        {user?.followers.length}
                    </Typography>
                    <Typography fontWeight="400">Followers</Typography>
                </Box>
                <Box textAlign="center">
                    <Typography fontWeight="600">
                        {user?.following.length}
                    </Typography>
                    <Typography fontWeight="400"> Following</Typography>
                </Box>
            </FlexBetween>
            <Box
                display="flex"
                justifyContent="space-evenly"
                borderTop={`1px solid ${bordercolor}`}
                borderBottom={`1px solid ${bordercolor}`}
                paddingY="0.5rem"
            >
                <Button startIcon={<Person />}>Profile</Button>
                <Button startIcon={<DynamicFeed />}>Posts</Button>
            </Box>

            {editOpen ? (
                <EditProfile />
            ) : (
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
                        <a
                            target="_blank"
                            href={user?.linkedin}
                            rel="noreferrer"
                        >
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
            )}
        </Box>
    );
};

export default UserProfile;
