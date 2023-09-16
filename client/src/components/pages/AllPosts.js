import React, { useEffect, useState } from "react";
import PostCard from "../cards/PostCard";
import { Box, Divider, Fab, useMediaQuery } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { Send } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PostSkeleton from "../skeletons/PostSkeleton";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllPosts = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
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

    // console.log(posts);

    return (
        <>
            {isMobileScreen && user && (
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
                loader={<PostSkeleton />}
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
