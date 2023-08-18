import React from "react";
import FlexBetween from "./FlexBetween";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

const FollowCard = ({ username, name }) => {
    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <Avatar />
                <Box>
                    <Typography fontSize="0.7rem">{username}</Typography>
                    <Typography>{name}</Typography>
                </Box>
            </FlexBetween>
            <Button startIcon={<AddOutlined />}>
                <Typography fontSize="0.7rem">Follow</Typography>
            </Button>
        </FlexBetween>
    );
};

export default FollowCard;
