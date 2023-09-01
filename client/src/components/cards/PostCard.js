import React, { useState } from "react";
import FollowCard from "./FollowCard";
import {
    Avatar,
    AvatarGroup,
    Box,
    IconButton,
    InputBase,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import FlexBetween from "../customComponents/FlexBetween";
import {
    ChatBubbleOutlineOutlined,
    SendOutlined,
    Share,
    ThumbUp,
    ThumbUpOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLoginPage } from "../../state/state";

const PostCard = ({
    imgPath,
    content,
    name,
    username,
    userPic,
    id,
    likes,
    comments,
    postId,
}) => {
    const [isComments, setIsComments] = useState(false);
    const { palette } = useTheme();
    const main = palette.primary.main;
    const isMobileScreen = useMediaQuery("(max-width:750px)");
    const loggedUser = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [isLiked, setIsLiked] = useState(likes.includes(loggedUser?._id));
    const [likesCount, setLikesCount] = useState(likes.length);
    const dispatch = useDispatch();

    const handleLike = async () => {
        if (!loggedUser) {
            dispatch(setLoginPage());
        } else {
            setIsLiked((prev) => !prev);
            setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

            try {
                await fetch(
                    `${process.env.REACT_APP_SERVER}/api/post/patchlikepost`,
                    {
                        method: "PATCH",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ postId: postId }),
                    }
                );
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap="1rem"
            padding={isMobileScreen ? "0.5rem 0.1rem" : "0.5rem 1rem"}
        >
            <FollowCard
                id={id}
                username={username}
                name={name}
                userPic={userPic}
                edit={true}
            />

            <Typography whiteSpace="pre-line" sx={{ color: main }}>
                {content}
            </Typography>
            {imgPath && (
                <img
                    src={imgPath}
                    alt="problem Pic"
                    style={{ borderRadius: "1rem" }}
                />
            )}
            <FlexBetween padding="0.2rem 0.5rem">
                <FlexBetween gap="1rem">
                    <FlexBetween>
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined fontSize="small" />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                    <FlexBetween>
                        <IconButton onClick={handleLike}>
                            {isLiked ? (
                                <ThumbUp
                                    fontSize="small"
                                    sx={{ color: "#F44E45" }}
                                />
                            ) : (
                                <ThumbUpOutlined fontSize="small" />
                            )}
                        </IconButton>
                        <Typography>{likesCount}</Typography>
                    </FlexBetween>
                    <IconButton>
                        <Share fontSize="small" />
                    </IconButton>
                </FlexBetween>
                <AvatarGroup max={5}>
                    <Avatar sx={{ width: 24, height: 24 }} />
                    <Avatar sx={{ width: 24, height: 24 }} />
                    <Avatar sx={{ width: 24, height: 24 }} />
                    <Avatar sx={{ width: 24, height: 24 }} />
                    <Avatar sx={{ width: 24, height: 24 }} />
                </AvatarGroup>
            </FlexBetween>
            {isComments && (
                <Box display="flex" alignItems="center" gap="0.6rem">
                    <Avatar />
                    <FlexBetween
                        borderRadius="50px"
                        gap="3rem"
                        padding="0rem 0.7rem"
                        width="100%"
                        border="1px solid #FFD1DA"
                    >
                        <InputBase fullWidth placeholder="Add a comment..." />
                        <IconButton>
                            <SendOutlined />
                        </IconButton>
                    </FlexBetween>
                </Box>
            )}
        </Box>
    );
};

export default PostCard;
