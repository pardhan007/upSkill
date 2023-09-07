import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import FollowCard from "./cards/FollowCard";

const UserFollowingList = ({ id }) => {
    const [following, setFollowing] = useState(null);
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
            };
            getUserFollowing();
        }
    }, [id]);
    return (
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
    );
};

export default UserFollowingList;
