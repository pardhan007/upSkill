import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Creator from "../Creator";
import CommunityPostsPage from "./CommunityPostsPage";
import AnnouncementPage from "./AnnouncementPage";
import CreatorSkeleton from "../skeletons/CreatorSkeleton";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

            if (!response.ok) {
                throw new Error("Failed to fetch community");
            }

            const requestedCommunity = await response.json();
            setCommunity(requestedCommunity);
        } catch (error) {
            console.error("Error fetching Community:", error);
            toast.error("Failed to fetch community. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!community) {
        return null;
    }

    return (
        <>
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
        </>
    );
};

export default CommunitiesPage;
