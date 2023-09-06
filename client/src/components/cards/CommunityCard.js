import React, { useState } from "react";
import FlexBetween from "../customComponents/FlexBetween";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import StyledAvatar from "../customComponents/StyledAvatar";
import { useDispatch, useSelector } from "react-redux";
import { setLoginPage } from "../../state/state";
import { LoadingButton } from "@mui/lab";

const CommunityCard = ({
    communityId,
    communityName,
    communityMembersCount,
    isjoined,
}) => {
    const { palette } = useTheme();
    const main = palette.primary.main;
    const lightblue = palette.primary.lightblue;
    const lightdark = palette.primary.lightdark;
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [isShowJoined, setIsShowJoined] = useState(isjoined);

    const handleJoin = async () => {
        if (!user) {
            dispatch(setLoginPage());
        } else {
            setLoading(true);
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_SERVER}/api/community/join`,
                    {
                        method: "PATCH",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ communityId: communityId }),
                    }
                );

                if (response.status === 200) {
                    // const updatedCommunity = await response.json();
                    // handleAddRemoveinCommunity(communityId, updatedCommunity);
                    setIsShowJoined((prev) => !prev);
                }
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }
    };
    const handleRemove = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}/api/community/leave`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ communityId: communityId }),
                }
            );
            if (response.status === 200) {
                // const updatedCommunity = await response.json();
                // handleAddRemoveinCommunity(communityId, updatedCommunity);
                setIsShowJoined((prev) => !prev);
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };
    return (
        <FlexBetween>
            <FlexBetween gap="0.7rem" sx={{ cursor: "pointer" }}>
                <StyledAvatar />
                <Box>
                    <Typography sx={{ color: main }} fontSize="1rem">
                        {communityName}
                    </Typography>
                    <Typography
                        fontSize="0.8rem"
                        sx={{
                            color: lightdark,
                        }}
                    >
                        {communityMembersCount} Members
                    </Typography>
                </Box>
            </FlexBetween>
            {isShowJoined ? (
                <LoadingButton
                    sx={{
                        fontSize: "0.8rem",
                        color: lightblue,
                    }}
                    loading={loading}
                    loadingIndicator={
                        <CircularProgress color="primary" size={20} />
                    }
                    onClick={handleRemove}
                >
                    Leave
                </LoadingButton>
            ) : (
                <LoadingButton
                    startIcon={
                        !isShowJoined && (
                            <AddOutlined sx={{ color: lightblue }} />
                        )
                    }
                    sx={{
                        fontSize: "0.8rem",
                        color: lightblue,
                    }}
                    loading={loading}
                    loadingIndicator={
                        <CircularProgress color="primary" size={20} />
                    }
                    onClick={handleJoin}
                >
                    Join
                </LoadingButton>
            )}
        </FlexBetween>
    );
};

export default CommunityCard;
