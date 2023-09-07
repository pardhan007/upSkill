import React, { useEffect, useState } from "react";
import PostCard from "../cards/PostCard";
import {
    Box,
    CircularProgress,
    Divider,
    Fab,
    useMediaQuery,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { Send } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AllPosts = () => {
    const navigate = useNavigate();
    const isMobileScreen = useMediaQuery("(max-width:750px)");
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const perPage = 10;

    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    const fetchPosts = async (currentPage) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}/api/post/feedposts?page=${currentPage}`,
                {
                    method: "GET",
                }
            );
            const newPosts = await response.json();
            setPosts((prevPosts) => [...prevPosts, ...newPosts]);
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

    // console.log(posts);

    return (
        <>
            {isMobileScreen && (
                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{
                        position: "absolute",
                        bottom: 70,
                        right: 20,
                        rotate: "-40deg",
                    }}
                    onClick={() => navigate("/createpost")}
                >
                    <Send fontSize="large" />
                </Fab>
            )}
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
        </>
    );
};

export default AllPosts;
