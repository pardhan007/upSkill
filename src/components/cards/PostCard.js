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
} from "@mui/icons-material";

const PostCard = ({ imgPath, content }) => {
    const [isComments, setIsComments] = useState(false);
    const { palette } = useTheme();
    const main = palette.primary.main;
    const isMobileScreen = useMediaQuery("(max-width:750px)");
    return (
        <Box
            display="flex"
            flexDirection="column"
            gap="1rem"
            padding={isMobileScreen ? "0.5rem 0.1rem" : "0.5rem 1rem"}
        >
            <FollowCard username={"@username"} name={"Name"} edit={true} />
            <Typography whiteSpace="pre-line" sx={{ color: main }}>
                {content}
            </Typography>
            <img
                src={imgPath}
                alt="problem Pic"
                style={{ borderRadius: "1rem" }}
            />
            <FlexBetween padding="0.2rem 0.5rem">
                <FlexBetween gap="1rem">
                    <FlexBetween>
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined fontSize="small" />
                        </IconButton>
                        <Typography>2</Typography>
                    </FlexBetween>
                    <FlexBetween>
                        <IconButton>
                            <ThumbUp fontSize="small" />
                        </IconButton>
                        <Typography>5</Typography>
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
