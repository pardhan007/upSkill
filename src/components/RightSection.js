import { Box, IconButton, InputBase, Typography } from "@mui/material";
import React from "react";
import FlexBetween from "./FlexBetween";
import { Search } from "@mui/icons-material";
import CommunityCard from "./CommunityCard";

const RightSection = () => {
    return (
        <Box width="26%">
            <Box
                display="flex"
                flexDirection="column"
                gap="0.5rem"
                padding="0.2rem 1rem"
            >
                <Box>
                    <FlexBetween
                        borderRadius="50px"
                        gap="2rem"
                        padding="0rem 0.7rem"
                        border="1px solid #FFD1DA"
                    >
                        <InputBase
                            fullWidth
                            placeholder="Search Joined Community"
                        />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                </Box>
                <Typography fontWeight="600">Popular Communities</Typography>
                <Box
                    marginTop="1rem"
                    display="flex"
                    flexDirection="column"
                    gap="1rem"
                >
                    <CommunityCard
                        communityName={"DSA Community"}
                        communityMembersCount={"345"}
                    />
                    <CommunityCard
                        communityName={"DSA Wizard"}
                        communityMembersCount={"41"}
                    />
                    <CommunityCard
                        communityName={"MEME"}
                        communityMembersCount={"19"}
                    />
                    <CommunityCard
                        communityName={"Ctrl+Alt"}
                        communityMembersCount={"60"}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default RightSection;
