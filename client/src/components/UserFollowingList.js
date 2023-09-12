import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import FollowCard from "./cards/FollowCard";
import FollowCardSkeleton from "./skeletons/FollowCardSkeleton";

const UserFollowingList = ({ id }) => {
    const [following, setFollowing] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (id) {
            const getUserFollowing = async () => {
                const response = await fetch(
                    `${process.env.REACT_APP_SERVER}/api/user/profile/${id}/following`,
                    {
                        method: "GET",
                    }
                );
                const data = await response.json();
                setFollowing(data);
                setLoading(false);
            };
            getUserFollowing();
        }
    }, [id]);
    return (
        <Box>
            {!loading ? (
                <Box display="flex" flexDirection="column" gap="1rem">
                    {following?.map((user) => (
                        <FollowCard
                            key={user._id}
                            id={user._id}
                            name={user.name}
                            username={user.username}
                            userPic={user.userPic}
                        />
                    ))}
                </Box>
            ) : (
                <Box display="flex" flexDirection="column" gap="1rem">
                    {Array.from({ length: 5 }, (_, index) => (
                        <FollowCardSkeleton key={index} />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default UserFollowingList;
