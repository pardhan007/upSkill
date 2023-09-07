import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import FollowCard from "./cards/FollowCard";

const UserFollowersList = ({ id }) => {
    const [followers, setFollowers] = useState(null);

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
            };
            getUserFollowers();
        }
    }, [id]);

    return (
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
    );
};

export default UserFollowersList;
