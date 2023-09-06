import React, { useEffect, useState } from "react";
import FollowCard from "./cards/FollowCard";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";

const AllUserList = () => {
    const [users, setUsers] = useState([]);
    const loggedUser = useSelector((state) => state.user);

    useEffect(() => {
        const getAllUser = async () => {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}/api/user/allusers`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            setUsers(data);
        };
        getAllUser();
    }, []);

    return (
        <Box display="flex" flexDirection="column" gap="1rem" padding="1rem">
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
    );
};

export default AllUserList;
