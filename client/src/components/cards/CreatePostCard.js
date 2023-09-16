import {
    Box,
    CircularProgress,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import StyledAvatar from "../customComponents/StyledAvatar";
import { AddPhotoAlternate, Cancel, Public } from "@mui/icons-material";
import FlexBetween from "../customComponents/FlexBetween";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePostCard = () => {
    const mode = useSelector((state) => state.mode);
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [newPost, setNewPost] = useState({
        content: "",
        postPic: "",
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState();

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    // image upload

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            setUploading(true);
            try {
                const formData = new FormData();
                formData.append("image", selectedFile);

                const response = await fetch(
                    `${process.env.REACT_APP_SERVER}/api/images/image-upload`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        body: formData,
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to upload image");
                }

                setUploading(false);
                const { url } = await response.json();
                return url;
            } catch (error) {
                console.error("Error uploading image:", error);
                // toast.error("Error uploading image. Please try again.");
                setUploading(false);
                return "";
            }
        } else {
            return "";
        }
    };

    const handleCreatePost = async () => {
        setLoading(true);

        try {
            let picUrl = "";
            if (selectedFile) {
                picUrl = await handleUpload();
                if (!picUrl) {
                    toast.error("Image upload failed. Post creation aborted.");
                    setLoading(false);
                    return;
                }
            }
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}/api/post/createpost`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...newPost, postPic: picUrl }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to create post");
            }

            navigate("/");
            toast.success("Post created successfully");
        } catch (error) {
            console.error("Error creating post:", error);
            toast.error("Failed to create post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap="1rem"
            bgcolor={mode === "dark" ? "#182322" : "#F7F8F9"}
            borderRadius="1rem"
            padding="1rem"
            paddingBottom="5rem"
        >
            <Box display="flex" gap="1rem">
                <StyledAvatar
                    sx={{ width: 50, height: 50 }}
                    src={user?.userPic}
                />
                <Box>
                    <Typography fontWeight="600">{user?.name}</Typography>
                    <Box display="flex" gap="0.3rem">
                        <Public fontSize="1rem" />
                        <Typography fontSize="0.7rem">Public</Typography>
                    </Box>
                </Box>
            </Box>
            <TextField
                placeholder="What do you want to talk about?"
                minRows={5}
                maxRows={8}
                multiline
                onChange={(e) =>
                    setNewPost((prev) => ({ ...prev, content: e.target.value }))
                }
            />
            {selectedFile && (
                <img
                    src={preview}
                    style={{ width: "200px" }}
                    alt="image_preview"
                />
            )}
            <FlexBetween>
                <FlexBetween gap="0.5rem">
                    <LoadingButton
                        startIcon={<AddPhotoAlternate color="success" />}
                        loading={uploading}
                        loadingIndicator={
                            <CircularProgress color="primary" size={20} />
                        }
                        sx={{
                            backgroundColor:
                                mode === "dark" ? "#2C3333" : "#EEEEEE",
                        }}
                        onClick={handleButtonClick}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                        Photo
                    </LoadingButton>
                    {selectedFile && (
                        <IconButton
                            onClick={() => setSelectedFile(null)}
                            disabled={uploading}
                        >
                            <Cancel fontSize="small" />
                        </IconButton>
                    )}
                </FlexBetween>
                <LoadingButton
                    loading={loading}
                    loadingIndicator={
                        <CircularProgress color="primary" size={20} />
                    }
                    sx={{
                        backgroundColor: "#0B64C3",
                        borderRadius: "1.5rem",
                        paddingX: "1rem",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#0B64C3",
                        },
                    }}
                    onClick={handleCreatePost}
                    disabled={!newPost.content && !selectedFile}
                >
                    Post
                </LoadingButton>
            </FlexBetween>
        </Box>
    );
};

export default CreatePostCard;
