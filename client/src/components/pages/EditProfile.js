import {
    Box,
    CircularProgress,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import FlexBetween from "../customComponents/FlexBetween";
import { GitHub, LinkedIn, Save } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { setUpdatedUser } from "../../state/state";

const EditProfile = () => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const [editValues, setEditValues] = useState({
        name: user.name,
        github: user.github,
        linkedin: user.linkedin,
        bio: user.bio,
    });

    function handleEditedValues(e) {
        setEditValues((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    }

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}/api/user/editprofile`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editValues),
                }
            );

            const updatedProfile = await response.json();
            dispatch(setUpdatedUser({ updatedProfile }));
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <Box display="flex" flexDirection="column" gap="1rem">
            <Typography
                sx={{
                    textDecoration: "underline",
                    fontSize: "1rem",
                    fontWeight: "600",
                }}
            >
                User Details
            </Typography>
            <FlexBetween gap="2rem" alignItems="center">
                <Typography>Name :</Typography>
                <TextField
                    hiddenLabel
                    size="small"
                    variant="outlined"
                    name="name"
                    type="text"
                    required
                    sx={{ width: "70%" }}
                    onChange={handleEditedValues}
                    value={editValues.name}
                />
            </FlexBetween>
            <FlexBetween gap="2rem" alignItems="center">
                <Typography>Email :</Typography>
                <TextField
                    disabled
                    hiddenLabel
                    size="small"
                    variant="outlined"
                    name="email"
                    type="email"
                    sx={{ width: "70%" }}
                    value={user.email}
                />
            </FlexBetween>
            <FlexBetween gap="2rem" alignItems="center">
                <Typography>Username :</Typography>
                <TextField
                    disabled
                    hiddenLabel
                    size="small"
                    variant="outlined"
                    name="username"
                    type="text"
                    required
                    sx={{ width: "70%" }}
                    value={user.username}
                />
            </FlexBetween>
            <Box>
                <Typography>Bio :</Typography>
                <TextField
                    multiline
                    rows={3}
                    placeholder="Enter your bio"
                    fullWidth
                    onChange={handleEditedValues}
                    name="bio"
                    value={editValues.bio}
                />
            </Box>
            <Box display="flex" flexDirection="column" gap="1rem">
                <Typography
                    sx={{
                        textDecoration: "underline",
                        fontSize: "1rem",
                        fontWeight: "600",
                    }}
                >
                    Social Links
                </Typography>
                <FlexBetween gap="1rem">
                    <LinkedIn fontSize="large" />
                    <TextField
                        hiddenLabel
                        size="small"
                        variant="outlined"
                        name="linkedin"
                        type="text"
                        fullWidth
                        placeholder="Enter Linkedin URL"
                        onChange={handleEditedValues}
                        value={editValues.linkedin}
                    />
                </FlexBetween>
                <FlexBetween gap="1rem">
                    <GitHub fontSize="large" />
                    <TextField
                        hiddenLabel
                        size="small"
                        variant="outlined"
                        name="github"
                        type="text"
                        fullWidth
                        placeholder="Enter GitHub URL"
                        onChange={handleEditedValues}
                        value={editValues.github}
                    />
                </FlexBetween>
            </Box>

            <LoadingButton
                startIcon={<Save />}
                sx={{
                    backgroundColor: "#F54E45",
                    color: "white",
                    paddingX: "1rem",
                    "&:hover": {
                        backgroundColor: "#F54E45",
                    },
                }}
                loading={loading}
                loadingIndicator={
                    <CircularProgress color="primary" size={20} />
                }
                type="submit"
                onClick={handleUpdate}
            >
                Save
            </LoadingButton>
        </Box>
    );
};

export default EditProfile;
