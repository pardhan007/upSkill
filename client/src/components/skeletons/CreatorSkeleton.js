import React from "react";
import FlexBetween from "../customComponents/FlexBetween";
import { Box, Skeleton } from "@mui/material";

const CreatorSkeleton = () => {
    return (
        <Box display="flex" flexDirection="column" gap="1rem" padding="1rem">
            <FlexBetween>
                <FlexBetween gap="0.5rem">
                    <Skeleton variant="circular" width={60} height={60} />
                    <Box>
                        <Skeleton
                            variant="text"
                            sx={{ fontSize: "1.3rem", width: "130px" }}
                        />
                        <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem", width: "50px" }}
                        />
                    </Box>
                </FlexBetween>
                <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", width: "20px" }}
                />
            </FlexBetween>

            <Skeleton variant="rounded" width="100%" height={30} />
        </Box>
    );
};

export default CreatorSkeleton;
