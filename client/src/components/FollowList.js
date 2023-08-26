import React from "react";
import Widget from "./customComponents/Widget";
import { Box, Paper } from "@mui/material";

import FollowCard from "./cards/FollowCard";

const FollowList = () => {
    return (
        <Widget>
            <Paper elevation={3}>
                <Box
                    display="flex"
                    flexDirection="column"
                    gap="1rem"
                    padding="1rem"
                >
                    <FollowCard
                        username={"@username"}
                        name={"Name"}
                        edit={false}
                    />
                    <FollowCard
                        username={"@username"}
                        name={"Name"}
                        edit={false}
                    />
                    <FollowCard
                        username={"@username"}
                        name={"Name"}
                        edit={false}
                    />
                </Box>
            </Paper>
        </Widget>
    );
};

export default FollowList;
