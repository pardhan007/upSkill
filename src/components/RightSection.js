import {
    Box,
    IconButton,
    InputBase,
    Typography,
    useMediaQuery,
} from "@mui/material";
import React from "react";
import FlexBetween from "./FlexBetween";
import { Search } from "@mui/icons-material";
import CommunityCard from "./CommunityCard";
import BottomToolbar from "./BottomToolbar";

const RightSection = () => {
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
    // console.log(membersDescending);

    const isTabletScreen = useMediaQuery("(max-width:1080px)");
    return (
        <Box width={isTabletScreen ? "100%" : "26%"} minWidth="280px">
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
            <BottomToolbar />
        </Box>
    );
};

export default RightSection;
