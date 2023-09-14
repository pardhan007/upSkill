import { Box, Skeleton } from "@mui/material";
import React from "react";
import FlexBetween from "../customComponents/FlexBetween";

const PostSkeleton = () => {
    return (
        <Box display="flex" flexDirection="column" gap="4rem" mt="1rem">
            <Box display="flex" flexDirection="column" gap="1rem">
                <FlexBetween>
                    <FlexBetween gap="1rem">
                        <Skeleton variant="circular" width={50} height={50} />
                        <Box>
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: "1rem", width: "200px" }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: "1rem", width: "100px" }}
                            />
                        </Box>
                    </FlexBetween>
                    <Skeleton variant="rounded" width={110} height={25} />
                </FlexBetween>
                <Box>
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem", width: "100%" }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem", width: "100%" }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem", width: "100%" }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem", width: "100%" }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem", width: "200px" }}
                    />
                </Box>
                <Skeleton variant="rounded" width="100%" height={300} />
                <Box display="flex" gap="0.7rem">
                    <Skeleton variant="circular" width={25} height={25} />
                    <Skeleton variant="circular" width={25} height={25} />
                    <Skeleton variant="circular" width={25} height={25} />
                </Box>
            </Box>
            <Box display="flex" flexDirection="column" gap="1rem">
                <FlexBetween>
                    <FlexBetween gap="1rem">
                        <Skeleton variant="circular" width={50} height={50} />
                        <Box>
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: "1rem", width: "200px" }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: "1rem", width: "100px" }}
                            />
                        </Box>
                    </FlexBetween>
                    <Skeleton variant="rounded" width={110} height={25} />
                </FlexBetween>
                <Box>
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem", width: "100%" }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem", width: "100%" }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem", width: "100%" }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem", width: "100%" }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem", width: "200px" }}
                    />
                </Box>
                <Skeleton variant="rounded" width="100%" height={300} />
                <Box display="flex" gap="0.7rem">
                    <Skeleton variant="circular" width={25} height={25} />
                    <Skeleton variant="circular" width={25} height={25} />
                    <Skeleton variant="circular" width={25} height={25} />
                </Box>
            </Box>
        </Box>
    );
};

export default PostSkeleton;
