import React from "react";
import FlexBetween from "./FlexBetween";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

const CommunityCard = ({ communityName, communityMembersCount }) => {
    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <Avatar />
                <Box>
                    <Typography fontSize="0.7rem">{communityName}</Typography>
                    <Typography>{communityMembersCount}</Typography>
                </Box>
            </FlexBetween>
            <Button startIcon={<AddOutlined />}>
                <Typography fontSize="0.7rem">Join</Typography>
            </Button>
        </FlexBetween>
    );
};

export default CommunityCard;
