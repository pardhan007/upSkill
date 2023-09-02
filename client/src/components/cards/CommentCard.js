import React from "react";
import StyledAvatar from "../customComponents/StyledAvatar";
import { Box, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Delete, MoreVert } from "@mui/icons-material";
import FlexBetween from "../customComponents/FlexBetween";

const CommentCard = ({ userPic, username, text, deleteComment, id }) => {
    const mode = useSelector((state) => state.mode);
    const loggedUser = useSelector((state) => state.user);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelComment = () => {
        handleClose();
        deleteComment(id);
    };

    return (
        <Box display="flex" gap="0.5rem">
            <StyledAvatar sx={{ width: 30, height: 30 }} src={userPic} />
            <Box
                display="flex"
                flexDirection="column"
                gap="0.5rem"
                paddingX="0.8rem"
                paddingY="0.5rem"
                width="90%"
                bgcolor={mode === "dark" ? "#182322" : "#F7F8F9"}
                borderRadius="1rem"
                sx={{
                    wordWrap: "break-word",
                }}
            >
                <FlexBetween>
                    <Typography fontSize="0.8rem">@{username}</Typography>
                    {loggedUser?.username === username && (
                        <Box>
                            <MoreVert
                                sx={{ fontSize: 21 }}
                                onClick={handleClick}
                                style={{ cursor: "pointer" }}
                            />
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: "visible",
                                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                        mt: 1.2,
                                        "& .MuiAvatar-root": {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        "&:before": {
                                            content: '""',
                                            display: "block",
                                            position: "absolute",
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: "background.paper",
                                            transform:
                                                "translateY(-50%) rotate(45deg)",
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{
                                    horizontal: "right",
                                    vertical: "top",
                                }}
                                anchorOrigin={{
                                    horizontal: "right",
                                    vertical: "bottom",
                                }}
                            >
                                <MenuItem onClick={handleDelComment}>
                                    <ListItemIcon>
                                        <Delete fontSize="small" />
                                    </ListItemIcon>
                                    Delete
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                </FlexBetween>
                <Typography fontWeight="400" paddingBottom="0.5rem">
                    {text}
                </Typography>
                {/* <Box display="flex" gap="1rem">
                    <ThumbUpOutlined fontSize="small" />
                    <Typography>Reply</Typography>
                </Box> */}
            </Box>
        </Box>
    );
};

export default CommentCard;
