import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import FollowCard from "./cards/FollowCard";
import FollowCardSkeleton from "./skeletons/FollowCardSkeleton";

const UserFollowersList = ({ id }) => {
    const [followers, setFollowers] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const getUserFollowers = async () => {
                const response = await fetch(
                    `${process.env.REACT_APP_SERVER}/api/user/profile/${id}/followers`,
                    {
                        method: "GET",
                    }
                );
                const data = await response.json();
                setFollowers(data);
                setLoading(false);
            };
            getUserFollowers();
        }
    }, [id]);

    return (
        <Box>
            {!loading ? (
                <Box display="flex" flexDirection="column" gap="1rem">
                    {followers?.map((follower) => (
                        <FollowCard
                            key={follower._id}
                            id={follower._id}
                            name={follower.name}
                            username={follower.username}
                            userPic={follower.userPic}
                        />
                    ))}
                </Box>
            ) : (
                <Box
                    display="flex"
                    flexDirection="column"
                    gap="1rem"
                >
                    {Array.from({ length: 5 }, (_, index) => (
                        <FollowCardSkeleton key={index} />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default UserFollowersList;
