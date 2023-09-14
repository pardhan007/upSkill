import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostSkeleton from "../skeletons/PostSkeleton";
import PostCard from "../cards/PostCard";
import { Box, Divider } from "@mui/material";

const CommunityPostsPage = ({ communityId }) => {
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const perPage = 10;

    useEffect(() => {
        clearPosts();
        setPage(1);
        fetchCommunityPosts(1);
    }, [communityId]);

    const fetchCommunityPosts = async (currentPage) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}/api/post/communityposts/${communityId}?page=${currentPage}`,
                {
                    method: "GET",
                }
            );
            const requestedCommunityPosts = await response.json();

            setPosts((prevPosts) => [...prevPosts, ...requestedCommunityPosts]);

            if (requestedCommunityPosts.length < perPage) {
                setHasMore(false);
            }
            // setLoading(false);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const loadMorePosts = () => {
        setPage(page + 1);
        fetchCommunityPosts(page + 1);
    };

    const clearPosts = () => {
        setPosts([]);
        setHasMore(true);
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
            height="75dvh"
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

export default CommunityPostsPage;
