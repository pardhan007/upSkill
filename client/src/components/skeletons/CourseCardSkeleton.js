import { Box, Skeleton } from "@mui/material";
import React from "react";

const CourseCardSkeleton = () => {
    return (
        <Box display="flex" columnGap="1rem" borderRadius="0.5rem">
            <Box width="120px" height="68px">
                <Skeleton variant="rounded" width={120} height={68} />
            </Box>
            <Box>
                <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                    width="150px"
                />
                <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                    width="70px"
                />
                <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                    width="100px"
                />
            </Box>
        </Box>
    );
};

export default CourseCardSkeleton;
