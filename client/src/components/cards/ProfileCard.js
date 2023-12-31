import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import FlexBetween from "../customComponents/FlexBetween";
import { Login, SendRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLoginPage, setUpdatedUser } from "../../state/state";
import { useNavigate } from "react-router-dom";
import StyledAvatar from "../customComponents/StyledAvatar";

const ProfileCard = () => {
    const { palette } = useTheme();
    const main = palette.primary.main;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const handleClick = () => {
        if (!user) {
            dispatch(setLoginPage());
        } else {
            navigate("/createpost");
        }
    };

    useEffect(() => {
        if (user) {
            const getUser = async () => {
                const response = await fetch(
                    `${process.env.REACT_APP_SERVER}/api/user/profile/${user._id}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const updatedProfile = await response.json();
                dispatch(setUpdatedUser({ updatedProfile }));
            };
            getUser();
        }
    }, []);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            padding="2rem 1rem"
        >
            <StyledAvatar
                sx={{
                    width: 80,
                    height: 80,
                    position: "absolute",
                    top: -35,
                    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                    bgcolor: "#FF6969",
                    color: "#E8E6E2",
                    zIndex: "111",
                }}
                src={user?.userPic}
            />
            {user !== null ? (
                <FlexBetween columnGap="5rem">
                    <Box
                        onClick={() =>
                            navigate(`/profile/${user._id}?type=followers`)
                        }
                        sx={{ cursor: "pointer" }}
                    >
                        <Typography fontWeight="600">
                            {user?.followers.length}
                        </Typography>
                        <Typography fontSize="0.8rem">Followers</Typography>
                    </Box>
                    <Box
                        onClick={() =>
                            navigate(`/profile/${user._id}?type=following`)
                        }
                        sx={{ cursor: "pointer" }}
                    >
                        <Typography fontWeight="600">
                            {user?.following.length}
                        </Typography>
                        <Typography fontSize="0.8rem">Following</Typography>
                    </Box>
                </FlexBetween>
            ) : null}
            <Box width="100%" marginTop="1rem">
                <Typography
                    fontSize="1.3rem"
                    fontWeight="600"
                    sx={{ color: main }}
                >
                    {user !== null ? user.name : "You Haven't Logged"}
                </Typography>
                <Typography fontSize="0.8rem" fontWeight="600">
                    {user !== null
                        ? `@${user.username}`
                        : "take your username now"}
                </Typography>
            </Box>
            <Box width="100%" marginTop="1rem">
                <Typography
                    sx={{
                        color: main,
                        overflow: "auto",
                        textOverflow: "ellipsis",
                    }}
                >
                    {user !== null
                        ? user.bio
                        : "Click the login button and make yourself a part of this wonderful community."}
                </Typography>
            </Box>
            <Button
                startIcon={user ? <SendRounded /> : <Login />}
                sx={{
                    fontSize: "0.7rem",
                    position: "absolute",
                    bottom: -18,
                    backgroundColor: "#F44F45",
                    color: "white",
                    borderRadius: "0.9rem",
                    padding: "0.5rem 1.5rem",
                    "&:hover": {
                        backgroundColor: "#F44F45",
                    },
                    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.2)",
                    fontWeight: "600",
                }}
                onClick={handleClick}
            >
                {user ? "Post" : "Login"}
            </Button>
        </Box>
    );
};

export default ProfileCard;
