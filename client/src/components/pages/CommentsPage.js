import { Box, CircularProgress, IconButton, InputBase } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledAvatar from "../customComponents/StyledAvatar";
import FlexBetween from "../customComponents/FlexBetween";
import { SendOutlined } from "@mui/icons-material";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentCard from "../cards/CommentCard";
import { useSelector } from "react-redux";

const CommentsPage = ({ postId }) => {
    const [commentText, setCommentText] = useState("");
    const loggedUser = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [page, setPage] = useState(1);
    const [comments, setComments] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const perPage = 5;

    useEffect(() => {
        fetchComments(page);
    }, [page]);

    const loadMorePosts = () => {
        setPage(page + 1);
    };

    const fetchComments = async (currentPage) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}/api/post/postcomments/${postId}?page=${currentPage}`,
                {
                    method: "GET",
                }
            );
            const newComments = await response.json();
            setComments((prevComments) => [...prevComments, ...newComments]);
            if (newComments.length < perPage) {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const postNewComment = async () => {
        try {
            const commentData = {
                text: commentText.slice(0, 200),
                postId: postId,
            };
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}/api/post/comment`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(commentData),
                }
            );

            const savedComment = await response.json();
            setComments((prev) => [savedComment, ...prev]);
            setCommentText("");
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const deleteComment = async (commentId) => {
        try {
            const commentData = {
                commentId: commentId,
                postId: postId,
            };
            await fetch(`${process.env.REACT_APP_SERVER}/api/post/uncomment`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(commentData),
            });

            setComments(
                comments.filter((comment) => comment._id !== commentId)
            );
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    return (
        <Box display="flex" flexDirection="column" gap="1rem">
            <Box display="flex" alignItems="center" gap="0.6rem">
                <StyledAvatar src={loggedUser?.userPic} />
                <FlexBetween
                    borderRadius="50px"
                    gap="3rem"
                    padding="0rem 0.7rem"
                    width="100%"
                    border="1px solid #FFD1DA"
                >
                    <InputBase
                        fullWidth
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <IconButton
                        size="small"
                        onClick={postNewComment}
                        disabled={!commentText.length}
                    >
                        <SendOutlined />
                    </IconButton>
                </FlexBetween>
            </Box>
            <InfiniteScroll
                dataLength={comments.length}
                next={loadMorePosts}
                hasMore={hasMore}
                loader={
                    <Box display="flex" justifyContent="center">
                        <CircularProgress size={30} />
                    </Box>
                }
                height={comments?.length >= 5 ? "40dvh" : "auto"}
            >
                <Box display="flex" flexDirection="column" gap="1rem">
                    {comments?.map((comment) => (
                        <CommentCard
                            key={comment._id}
                            id={comment._id}
                            username={comment?.postedBy.username}
                            userPic={comment.postedBy.userPic}
                            text={comment.text}
                            deleteComment={deleteComment}
                        />
                    ))}
                </Box>
            </InfiniteScroll>
        </Box>
    );
};

export default CommentsPage;
