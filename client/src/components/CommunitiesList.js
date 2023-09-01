import { Box } from "@mui/material";
import React from "react";

import CommunityCard from "./cards/CommunityCard";

const CommunitiesList = () => {
    const communitiesData = [
        { members: 456, name: "MERN Community" },
        { members: 334, name: "DSA Wizard" },
        { members: 41, name: "MEME" },
        { members: 67, name: "CP Masters" },
        { members: 42, name: "Crtl+DSA" },
    ];

    const membersDescending = [...communitiesData].sort(
        (a, b) => b.members - a.members
    );
    return (
        <Box
            display="flex"
            flexDirection="column"
            gap="0.5rem"
            padding="0.2rem 1rem"
        >
            <Box
                marginTop="1rem"
                display="flex"
                flexDirection="column"
                gap="1rem"
            >
                {membersDescending.map((community) => {
                    return (
                        <CommunityCard
                            key={`${community.name} ${community.members}`}
                            communityName={community.name}
                            communityMembersCount={community.members}
                        />
                    );
                })}
            </Box>
        </Box>
    );
};

export default CommunitiesList;
