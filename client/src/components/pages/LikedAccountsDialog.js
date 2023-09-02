import { Close } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import FollowCard from "../cards/FollowCard";
import { useTheme } from "@emotion/react";
import Widget from "../customComponents/Widget";

const LikedAccountsDialog = ({ likedAccounts }) => {
    const { palette } = useTheme();
    const main = palette.primary.main;
    const bordercolor = palette.primary.bordercolor;

    return (
        <Widget
            display="flex"
            flexDirection="column"
            gap="1rem"
            padding="1rem"
            paddingBottom="2rem"
            width="400px"
            overflow="auto"
            maxHeight="400px"
        >
            <Box>
                <IconButton>
                    <Close />
                </IconButton>
            </Box>
            <Typography
                fontWeight="600"
                color={main}
                paddingY="0.5rem"
                borderTop={`1px solid ${bordercolor}`}
                borderBottom={`1px solid ${bordercolor}`}
            >
                Total
            </Typography>
            {likedAccounts.map((account) => (
                <FollowCard
                    key={account._id}
                    id={account._id}
                    name={account.name}
                    username={account.username}
                    userPic={account.userPic}
                    showFollow={false}
                />
            ))}
        </Widget>
    );
};

export default LikedAccountsDialog;
