import {
    Avatar,
    Box,
    Button,
    Paper,
    Typography,
    useTheme,
} from "@mui/material";
import React from "react";
import Widget from "../customComponents/Widget";
import FlexBetween from "../customComponents/FlexBetween";
import { SendRounded } from "@mui/icons-material";

const ProfileCard = ({ isloggedIn }) => {
    const { palette } = useTheme();
    const main = palette.primary.main;
    return (
        <Widget>
            <Paper elevation={3}>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                    gap="1rem"
                    padding="2rem 1rem"
                    position="relative"
                >
                    <Avatar
                        sx={{
                            width: 70,
                            height: 70,
                            position: "absolute",
                            top: -35,
                            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                            bgcolor: "#FF6969",
                            color: "#E8E6E2",
                        }}
                    />
                    <FlexBetween gap="5rem">
                        <Box>
                            <Typography fontWeight="600">0</Typography>
                            <Typography fontSize="0.8rem">Followers</Typography>
                        </Box>
                        <Box>
                            <Typography fontWeight="600">0</Typography>
                            <Typography fontSize="0.8rem">Following</Typography>
                        </Box>
                    </FlexBetween>
                    <Box width="100%">
                        <Typography
                            fontSize="1.3rem"
                            fontWeight="600"
                            sx={{ color: main }}
                        >
                            {isloggedIn
                                ? "Harsh Prajapati"
                                : "You Haven't Logged"}
                        </Typography>
                        <Typography fontSize="0.8rem" fontWeight="600">
                            {isloggedIn
                                ? "@undefined4142"
                                : "take your username now"}
                        </Typography>
                    </Box>
                    <Box width="100%">
                        <Typography sx={{ color: main }}>
                            {isloggedIn
                                ? "Add an awesome bio right now."
                                : "Click the login button and make yourself a part of this wonderful community."}
                        </Typography>
                    </Box>
                    <Button
                        startIcon={<SendRounded />}
                        sx={{
                            fontSize: "0.7rem",
                            position: "absolute",
                            bottom: -18,
                            backgroundColor: "#F44F45",
                            color: "white",
                            borderRadius: "0.9rem",
                            padding: "0.5rem 1.5rem",
                            "&:hover": {
                                backgroundColor: "#F44F45",
                            },
                            boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
                            fontWeight: "600",
                        }}
                    >
                        Post
                    </Button>
                </Box>
            </Paper>
        </Widget>
    );
};

export default ProfileCard;
