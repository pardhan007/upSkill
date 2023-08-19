import React, { useState } from "react";
import PostCard from "./PostCard";
import { Box, Divider, Pagination } from "@mui/material";
import { postsData } from "./PostsData";

const AllPosts = () => {
    // console.log(postsData);
    const [page, setPage] = useState(1);
    let totalPages = Math.ceil(postsData.length / 5);

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <>
            {postsData.slice(page * 5 - 5, page * 5).map((post, i) => (
                <Box key={i}>
                    <PostCard imgPath={post.imgPath} content={post.content} />
                    <Divider />
                </Box>
            ))}
            <Box
                width="100%"
                display="flex"
                justifyContent="center"
                padding="2rem"
            >
                <Pagination
                    count={totalPages}
                    color="info"
                    page={page}
                    onChange={handleChange}
                />
            </Box>
        </>
    );
};

export default AllPosts;
