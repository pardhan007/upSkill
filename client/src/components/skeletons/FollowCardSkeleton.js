import { Box, Skeleton } from "@mui/material";
import React from "react";
import FlexBetween from "../customComponents/FlexBetween";

const FollowCardSkeleton = () => {
    return (
        <FlexBetween>
            <FlexBetween gap="0.5rem">
                <Skeleton variant="circular" width={40} height={40} />
                <Box>
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem", width: "60px" }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem", width: "90px" }}
                    />
                </Box>
            </FlexBetween>
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "70px" }} />
        </FlexBetween>
    );
};

export default FollowCardSkeleton;
