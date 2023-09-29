import React, { useEffect, useState } from "react";
import FollowCard from "./cards/FollowCard";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";
import FollowCardSkeleton from "./skeletons/FollowCardSkeleton";

const AllUserList = ({ search }) => {
    const [users, setUsers] = useState([]);
    const loggedUser = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(null);
    const queryParams = search ? `?search=${search}` : "";

    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
            getAllUser();
        }, 300);

        setTimer(newTimer);

        return () => {
            if (newTimer) {
                clearTimeout(newTimer);
            }
        };
    }, [search]);

    const getAllUser = async () => {
        setLoading(true);
        const response = await fetch(
            `${process.env.REACT_APP_SERVER}/api/user/allusers${queryParams}`,
            {
                method: "GET",
            }
        );
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
    };

    if (!users) {
        return null;
    }

    return (
        <Box overflow="auto" height="73dvh">
            {!loading ? (
                <Box
                    display="flex"
                    flexDirection="column"
                    gap="1rem"
                    padding="1rem"
                >
                    {users
                        // ?.slice(0, 10)
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
