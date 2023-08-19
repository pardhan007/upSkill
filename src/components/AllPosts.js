import React from "react";
import PostCard from "./PostCard";
import { Divider } from "@mui/material";

const AllPosts = () => {
    return (
        <>
            <PostCard
                path={
                    "https://d3gmywgj71m21w.cloudfront.net/865e0d16dea1ba95e418a12f162eec18.jpg"
                }
            />
            <Divider />
            <PostCard />
            <Divider />
            <PostCard
                path={
                    "https://d3gmywgj71m21w.cloudfront.net/865e0d16dea1ba95e418a12f162eec18.jpg"
                }
            />
            <Divider />
            <PostCard />
            <Divider />
        </>
    );
};

export default AllPosts;
