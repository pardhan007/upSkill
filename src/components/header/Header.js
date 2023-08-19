import React from "react";
import { Box, Switch, Typography, useMediaQuery } from "@mui/material";
import FlexBetween from "../customComponents/FlexBetween";
import StyledAvatar from "../customComponents/StyledAvatar";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../state/state";
export const Header = ({ pageName }) => {
    const mode = useSelector((state) => state.mode);
    const dispatch = useDispatch();
    const isMobileScreen = useMediaQuery("(max-width:750px)");
    return (
        <Box>
            <FlexBetween
                padding="1rem 1rem"
                borderBottom={
                    mode === "dark" ? "1px solid #3F2E3E" : "1px solid #FFD1DA"
                }
            >
                <FlexBetween gap="1rem">
                    <img
                        src="../assets/logo.png"
                        alt="logo"
                        style={{ width: "2.5rem" }}
                    />
                    {!isMobileScreen && (
                        <Typography fontSize="1.5rem" fontWeight="600">
                            Plutonn
                        </Typography>
                    )}
                </FlexBetween>
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
