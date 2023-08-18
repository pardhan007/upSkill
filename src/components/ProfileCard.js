import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";
import Widget from "./Widget";

const ProfileCard = () => {
    return (
        <Widget>
            <Paper elevation={3}>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                    gap="1rem"
                    padding="1rem"
                >
                    <Box>
                        <Avatar />
                    </Box>
                    <Box width="100%">
                        <Typography fontSize="1.3rem" fontWeight="600">
                            You Haven't Logged{" "}
                        </Typography>
                        <Typography fontSize="0.8rem" fontWeight="600">
                            take your username now{" "}
                        </Typography>
                    </Box>
                    <Box width="100%">
                        <Typography>
                            Click the login button and make yourself a part of
                            this wonderful community.
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Widget>
    );
};

export default ProfileCard;
