import React, { useEffect, useState } from "react";
import PostCard from "../cards/PostCard";
import { Box, CircularProgress, Divider } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

const AllPosts = () => {
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const perPage = 10;

    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    const fetchPosts = async (currentPage) => {
        try {
            console.log(currentPage);
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}/api/post/feedposts?page=${currentPage}`,
                {
                    method: "GET",
                }
            );
            const newPosts = await response.json();
            setPosts((prevPosts) => [...prevPosts, ...newPosts]);
            console.log(newPosts.length);
            if (newPosts.length < perPage) {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const loadMorePosts = () => {
        setPage(page + 1);
    };

    console.log(posts);

    return (
        <>
            <InfiniteScroll
                dataLength={posts.length}
                next={loadMorePosts}
                hasMore={hasMore}
                loader={
                    <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                }
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                height="90dvh"
            >
                {posts?.map((post, i) => (
                    <Box key={i}>
                        <PostCard
                            id={post.postedBy._id}
                            name={post.postedBy.name}
                            username={post.postedBy.username}
                            userPic={post.postedBy.userPic}
                            imgPath={post.imgPath}
                            content={post.content}
                        />
                        <Divider />
                    </Box>
                ))}
            </InfiniteScroll>
        </>
    );
};

export default AllPosts;
