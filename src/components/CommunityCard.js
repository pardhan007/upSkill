import React, { useState } from "react";
import FlexBetween from "./FlexBetween";
import { Box, Button, Typography } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import StyledAvatar from "./StyledAvatar";

const CommunityCard = ({ communityName, communityMembersCount }) => {
    const [join, setJoin] = useState(false);
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
            <Button
                startIcon={!join && <AddOutlined />}
                onClick={() => setJoin(!join)}
            >
                <Typography fontSize="0.8rem">
                    {join ? "Leave" : "Join"}
                </Typography>
            </Button>
        </FlexBetween>
    );
};

export default CommunityCard;
