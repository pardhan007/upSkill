import { Box, Divider, Skeleton } from "@mui/material";
import React from "react";
import FlexBetween from "../customComponents/FlexBetween";

const UserProfileSkeleton = () => {
    return (
        <Box display="flex" flexDirection="column" gap="1rem">
            <FlexBetween>
                <FlexBetween gap="1rem">
                    <Skeleton variant="circular" width={55} height={55} />
                    <Box>
                        <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem", width: "50px" }}
                        />
                        <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem", width: "100px" }}
                        />
                    </Box>
                </FlexBetween>
                <Skeleton variant="rounded" width={90} height={20} />
            </FlexBetween>
            <FlexBetween>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Skeleton
                        variant="text"
                        sx={{
                            fontSize: "1rem",
                            width: "20px",
                        }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem", width: "60px" }}
                    />
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Skeleton
                        variant="text"
                        sx={{
                            fontSize: "1rem",
                            width: "20px",
                        }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem", width: "60px" }}
                    />
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Skeleton
                        variant="text"
                        sx={{
                            fontSize: "1rem",
                            width: "20px",
                        }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem", width: "60px" }}
                    />
                </Box>
            </FlexBetween>
            <Divider />
            <Skeleton height="50px" />
        </Box>
    );
};

export default UserProfileSkeleton;
