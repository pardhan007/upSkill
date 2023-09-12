import React, { useEffect, useState } from "react";
import FollowCard from "./cards/FollowCard";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";
import FollowCardSkeleton from "./skeletons/FollowCardSkeleton";

const AllUserList = () => {
    const [users, setUsers] = useState([]);
    const loggedUser = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getAllUser = async () => {
            setLoading(true);
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}/api/user/allusers`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            setUsers(data);
            setLoading(false);
        };
        getAllUser();
    }, []);

    return (
        <Box>
            {!loading ? (
                <Box
                    display="flex"
                    flexDirection="column"
                    gap="1rem"
                    padding="1rem"
                >
                    {users
                        ?.slice(0, 10)
                        .filter((user) => user._id !== loggedUser?._id)
                        .map((user) => (
                            <FollowCard
                                key={user._id}
                                id={user._id}
                                username={user.username}
                                name={user.name}
                                userPic={user.userPic}
                                edit={false}
                            />
                        ))}
                </Box>
            ) : (
                <Box
                    display="flex"
                    flexDirection="column"
                    gap="1rem"
                    padding="0.6rem"
                >
                    {Array.from({ length: 5 }, (_, index) => (
                        <FollowCardSkeleton key={index} />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default AllUserList;
