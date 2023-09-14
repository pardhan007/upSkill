import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import Creator from "../Creator";
import CommunityPostsPage from "./CommunityPostsPage";
import AnnouncementPage from "./AnnouncementPage";
import CreatorSkeleton from "../skeletons/CreatorSkeleton";

const CommunitiesPage = () => {
    const { communityId } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("type");
    const [community, setCommunity] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCommunity();
    }, [communityId]);

    const fetchCommunity = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}/api/community/get/${communityId}`,
                {
                    method: "GET",
                }
            );
            const requestedCommunity = await response.json();
            setCommunity(requestedCommunity);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
        setLoading(false);
    };

    if (!community) {
        return null;
    }

    return (
        <Box>
            {!loading ? (
                <>
                    <Creator
                        type={type}
                        communityId={communityId}
                        communityName={community.communityName}
                        communityPic={community.communityPic}
                        communityMembersCount={community.members.length}
                    />
                    {type === "announcement" ? (
                        <AnnouncementPage
                            announcementArr={community.announcement}
                        />
                    ) : (
                        <CommunityPostsPage communityId={communityId} />
                    )}
                </>
            ) : (
                <CreatorSkeleton />
            )}
        </Box>
    );
};

export default CommunitiesPage;
