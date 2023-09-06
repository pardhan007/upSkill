import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import CommunityCard from "./cards/CommunityCard";
import { useSelector } from "react-redux";

const CommunitiesList = () => {
    const user = useSelector((state) => state.user);
    const [communities, setCommunities] = useState([]);
    // const handleAddRemoveinCommunity = (id, updatedCommunity) => {
    //     setCommunities((prev) =>
    //         prev.filter((community) =>
    //             community._id === id ? updatedCommunity : community
    //         )
    //     );
    // };

    useEffect(() => {
        fetchCommunities();
    }, []);

    const fetchCommunities = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}/api/community/allcommunities`,
                {
                    method: "GET",
                }
            );
            const requestedCommunities = await response.json();
            setCommunities(requestedCommunities);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const membersDescending = [...communities].sort(
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
                {membersDescending?.map((community) => {
                    return (
                        <CommunityCard
                            key={`${community.name} ${community.members}`}
                            communityId={community._id}
                            communityName={community.communityName}
                            communityMembersCount={community.members.length}
                            isjoined={community.members.includes(user?._id)}
                        />
                    );
                })}
            </Box>
        </Box>
    );
};

export default CommunitiesList;
