import React, { useState } from "react";
import FollowCard from "./FollowCard";
import {
    AvatarGroup,
    Backdrop,
    Box,
    Button,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import FlexBetween from "../customComponents/FlexBetween";
import {
    ChatBubbleOutlineOutlined,
    Share,
    ThumbUp,
    ThumbUpOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLoginPage } from "../../state/state";
import StyledAvatar from "../customComponents/StyledAvatar";
import LikedAccountsDialog from "../pages/LikedAccountsDialog";
import CommentsPage from "../pages/CommentsPage";

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
    const [likedAccounts, setLikedAccounts] = useState(likes);
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(
        likedAccounts.find((like) => like._id === loggedUser?._id)
    );
    const [likesCount, setLikesCount] = useState(likedAccounts.length);

    // read more & read less logic

    const maxInitialDisplayLength = 3;
    const [isExpanded, setIsExpanded] = useState(false);

    const truncatedContent = content
        .split("\n")
        .slice(0, maxInitialDisplayLength)
        .join("\n");

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    // likes dialog logic

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleLike = async () => {
        if (!loggedUser) {
            dispatch(setLoginPage());
        } else {
            setIsLiked((prev) => !prev);
            setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

            try {
                const response = await fetch(
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
                const data = await response.json();
                setLikedAccounts(data);

                // console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
    };
    // console.log(`${loggedUser?.name} ${postId} -> ${isLiked}`);

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
            <Box>
                <Typography whiteSpace="pre-line" sx={{ color: main }}>
                    {isExpanded ? content : truncatedContent}
                </Typography>
                {content.length > truncatedContent.length && (
                    <Typography
                        onClick={toggleExpand}
                        sx={{ cursor: "pointer", color: "grey" }}
                    >
                        {isExpanded ? "see less" : "...see more"}
                    </Typography>
                )}
            </Box>

            {imgPath && (
                <img
                    src={imgPath}
                    alt="problem Pic"
                    style={{
                        borderRadius: "1rem",
                        boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
                        objectFit: "contain",
                        maxHeight: "650px",
                    }}
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
                <Box>
                    <AvatarGroup max={5} onClick={handleOpen}>
                        {likedAccounts.map((like) => (
                            <StyledAvatar
                                key={like._id}
                                sx={{ width: 24, height: 24 }}
                                src={like.userPic}
                            />
                        ))}
                    </AvatarGroup>
                    <Backdrop
                        sx={{
                            color: "#fff",
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                        open={open}
                        onClick={handleClose}
                    >
                        <LikedAccountsDialog likedAccounts={likedAccounts} />
                    </Backdrop>
                </Box>
            </FlexBetween>
            {isComments && <CommentsPage postId={postId} />}
        </Box>
    );
};

export default PostCard;
