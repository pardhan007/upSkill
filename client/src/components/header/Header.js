import React from "react";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import FlexBetween from "../customComponents/FlexBetween";
import StyledAvatar from "../customComponents/StyledAvatar";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLoginPage, setMode, setPageName } from "../../state/state";
import { useNavigate } from "react-router-dom";
export const Header = () => {
    const mode = useSelector((state) => state.mode);
    const isMobileScreen = useMediaQuery("(max-width:750px)");
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pagename = useSelector((state) => state.pagename);

    const handleClick = () => {
        if (!user) {
            dispatch(setLoginPage());
        } else {
            navigate(`/profile/${user._id}`);
            dispatch(setPageName({ pagename: "User Profile" }));
        }
    };

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
                        src="../assets/us_logo.png"
                        alt="logo"
                        style={{ width: "2.5rem", borderRadius: "50%" }}
                    />
                    {!isMobileScreen && (
                        <Typography
                            fontFamily="Changa"
                            fontSize="1.5rem"
                            fontWeight="600"
                        >
                            upSkill
                        </Typography>
                    )}
                </FlexBetween>
                {!isMobileScreen && (
                    <Typography fontSize="1.5rem" fontWeight="700">
                        {/* {pageName === "posts" ? "Posts" : "Announcement"} */}
                        {/* {pagename} */}
                    </Typography>
                )}
                <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {mode === "dark" ? (
                            <LightMode />
                        ) : (
                            <DarkMode color="primary" />
                        )}
                    </IconButton>
                    <StyledAvatar onClick={handleClick} src={user?.userPic} />
                </FlexBetween>
            </FlexBetween>
        </Box>
    );
};
