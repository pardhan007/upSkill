import React from "react";
import FlexBetween from "../customComponents/FlexBetween";
import { Box, Skeleton } from "@mui/material";

const CommunityCardSkeleton = () => {
    return (
        <FlexBetween>
            <FlexBetween gap="0.5rem">
                <Skeleton variant="circular" width={40} height={40} />
                <Box>
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem", width: "100px" }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem", width: "50px" }}
                    />
                </Box>
            </FlexBetween>
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "70px" }} />
        </FlexBetween>
    );
};

export default CommunityCardSkeleton;
