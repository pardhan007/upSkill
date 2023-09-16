import { Box, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./cards/PostCard";
import PostSkeleton from "./skeletons/PostSkeleton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserPosts = ({ id }) => {
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const perPage = 10;

    useEffect(() => {
        fetchUserPosts(page);
    }, [page]);

    const fetchUserPosts = async (currentPage) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}/api/post/userposts/${id}?page=${currentPage}`,
                {
                    method: "GET",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch posts");
            }

            const newPosts = await response.json();
            setPosts((prevPosts) => [...prevPosts, ...newPosts]);

            if (newPosts.length < perPage) {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
            toast.error("Failed to fetch posts. Please try again.");
        }
    };

    const loadMorePosts = () => {
        setPage(page + 1);
    };
    return (
        <InfiniteScroll
            dataLength={posts.length}
            next={loadMorePosts}
            hasMore={hasMore}
            loader={<PostSkeleton />}
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
            height="70dvh"
        >
            {posts?.map((post, i) => (
                <Box key={i}>
                    <PostCard
                        postId={post._id}
                        id={post.postedBy._id}
                        name={post.postedBy.name}
                        username={post.postedBy.username}
                        userPic={post.postedBy.userPic}
                        imgPath={post.postPic}
                        content={post.content}
                        likes={post.likes}
                        comments={post.comments}
                    />
                    <Divider />
                </Box>
            ))}
        </InfiniteScroll>
    );
};

export default UserPosts;
