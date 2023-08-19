import React, { useState } from "react";
import FlexBetween from "./FlexBetween";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import StyledAvatar from "./StyledAvatar";

const CommunityCard = ({ communityName, communityMembersCount }) => {
    const [join, setJoin] = useState(false);

    const { palette } = useTheme();
    const main = palette.primary.main;
    const lightblue = palette.primary.lightblue;
    const lightdark = palette.primary.lightdark;
    return (
        <FlexBetween>
            <FlexBetween gap="0.7rem" sx={{ cursor: "pointer" }}>
                <StyledAvatar />
                <Box>
                    <Typography sx={{ color: main }} fontSize="1rem">
                        {communityName}
                    </Typography>
                    <Typography
                        fontSize="0.8rem"
                        sx={{
                            color: lightdark,
                        }}
                    >
                        {communityMembersCount} Members
                    </Typography>
                </Box>
            </FlexBetween>
            <Button
                startIcon={!join && <AddOutlined sx={{ color: lightblue }} />}
                onClick={() => setJoin(!join)}
            >
                <Typography fontSize="0.8rem" sx={{ color: lightblue }}>
                    {join ? "Leave" : "Join"}
                </Typography>
            </Button>
        </FlexBetween>
    );
};

export default CommunityCard;
