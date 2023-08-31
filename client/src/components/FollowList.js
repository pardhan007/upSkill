import React, { useEffect, useState } from "react";
import Widget from "./customComponents/Widget";

import FollowCard from "./cards/FollowCard";
import { useDispatch, useSelector } from "react-redux";
import { setUpdatedUser } from "../state/state";

const FollowList = () => {
    const [users, setUsers] = useState(null);
    const token = useSelector((state) => state.token);
    const loggedUser = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

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

    const handleFollow = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}/api/user/follow`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: id }),
                }
            );

            if (response.status === 200) {
                const updatedProfile = await response.json();
                console.log(updatedProfile);
                dispatch(setUpdatedUser({ updatedProfile }));
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };
    const handleUnfollow = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}/api/user/unfollow`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: id }),
                }
            );
            if (response.status === 200) {
                const updatedProfile = await response.json();
                console.log(updatedProfile);
                dispatch(setUpdatedUser({ updatedProfile }));
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <Widget display="flex" flexDirection="column" gap="1rem" padding="1rem">
            {users
                ?.filter((user) => user._id !== loggedUser?._id)
                .map((user) => (
                    <FollowCard
                        key={user._id}
                        id={user._id}
                        username={user.username}
                        name={user.name}
                        userPic={user.userPic}
                        edit={false}
                        handleFollow={handleFollow}
                        handleUnfollow={handleUnfollow}
                    />
                ))}
        </Widget>
    );
};

export default FollowList;
