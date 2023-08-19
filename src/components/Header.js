import React from "react";
import { Box, Switch, Typography, useMediaQuery } from "@mui/material";
import FlexBetween from "./FlexBetween";
import StyledAvatar from "./StyledAvatar";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../state/state";
export const Header = ({ pageName }) => {
    const mode = useSelector((state) => state.mode);
    const dispatch = useDispatch();
    const isMobileScreen = useMediaQuery("(max-width:750px)");
    return (
        <Box>
            <FlexBetween padding="1rem 1rem" borderBottom="1px solid #FFD1DA">
                <Typography fontSize="1.5rem">Plutonn</Typography>
                {!isMobileScreen && (
                    <Typography fontSize="1.5rem" fontWeight="700">
                        Community -{" "}
                        {pageName === "posts" ? "Posts" : "Announcement"}
                    </Typography>
                )}
                <FlexBetween gap="2rem">
                    <FlexBetween>
                        <LightMode />
                        <Switch
                            onClick={() => dispatch(setMode())}
                            defaultChecked={mode === "dark"}
                        />
                        <DarkMode />
                    </FlexBetween>
                    <StyledAvatar />
                </FlexBetween>
            </FlexBetween>
        </Box>
    );
};
