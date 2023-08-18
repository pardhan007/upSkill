import React from "react";
import FlexBetween from "./FlexBetween";
import { Box, Button, Typography } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import StyledAvatar from "./StyledAvatar";

const CommunityCard = ({ communityName, communityMembersCount }) => {
    return (
        <FlexBetween>
            <FlexBetween gap="0.7rem" sx={{ cursor: "pointer" }}>
                <StyledAvatar />
                <Box>
                    <Typography fontSize="1rem">{communityName}</Typography>
                    <Typography fontSize="0.8rem" sx={{ color: "grey" }}>
                        {communityMembersCount} Members
                    </Typography>
                </Box>
            </FlexBetween>
            <Button startIcon={<AddOutlined />}>
                <Typography fontSize="0.8rem">Join</Typography>
            </Button>
        </FlexBetween>
    );
};

export default CommunityCard;
