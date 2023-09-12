import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import FlexBetween from "../customComponents/FlexBetween";
import StyledAvatar from "../customComponents/StyledAvatar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBackSharp, EditOutlined } from "@mui/icons-material";
import EditProfile from "./EditProfile";
import { setLogout } from "../../state/state";
import UserAboutPage from "./UserAboutPage";
import UserFollowersList from "../UserFollowersList";
import UserFollowingList from "../UserFollowingList";
import UserPosts from "../UserPosts";
import UserProfileSkeleton from "../skeletons/UserProfileSkeleton";

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const token = useSelector((state) => state.token);
    const loggedUser = useSelector((state) => state.user);
    const { palette } = useTheme();
    const main = palette.primary.main;
    const [editOpen, setEditOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("type");

    const handlePage = () => {
        if (type === null) {
            return <UserAboutPage id={id} logout={logout} user={user} />;
        } else if (type === "posts") {
            return <UserPosts id={id} />;
        } else if (type === "followers") {
            return <UserFollowersList id={id} />;
        } else if (type === "following") {
            return <UserFollowingList id={id} />;
        }
    };

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
                setLoading(false);
            };
            getUser();
        }
    }, [id]);
    // console.log(user);
    // if (!user) return null;

    const logout = () => {
        dispatch(setLogout());
        navigate("/");
    };

    return (
        <Box>
            {!loading ? (
                <Box
                    display="flex"
                    flexDirection="column"
                    padding="0.5rem"
                    gap="1rem"
                >
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
                                    editOpen ? (
                                        <ArrowBackSharp />
                                    ) : (
                                        <EditOutlined />
                                    )
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
                        <Box
                            textAlign="center"
                            sx={{ cursor: "pointer" }}
                            onClick={() => navigate("?type=posts")}
                        >
                            <Typography fontWeight="600">
                                {user?.postCount}
                            </Typography>
                            <Typography fontWeight="400">Posts</Typography>
                        </Box>
                        <Box
                            sx={{ cursor: "pointer", textAlign: "center" }}
                            onClick={() => navigate("?type=followers")}
                        >
                            <Typography fontWeight="600">
                                {user?.followers.length}
                            </Typography>
                            <Typography fontWeight="400">Followers</Typography>
                        </Box>
                        <Box
                            textAlign="center"
                            sx={{ cursor: "pointer" }}
                            onClick={() => navigate("?type=following")}
                        >
                            <Typography fontWeight="600">
                                {user?.following.length}
                            </Typography>
                            <Typography fontWeight="400"> Following</Typography>
                        </Box>
                    </FlexBetween>
                    <Divider />
                    {editOpen ? <EditProfile /> : <>{handlePage()}</>}
                </Box>
            ) : (
                <UserProfileSkeleton />
            )}
        </Box>
    );
};

export default UserProfile;
