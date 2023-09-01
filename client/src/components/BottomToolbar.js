import React, { useState } from "react";
import {
    AccountCircleRounded,
    Groups2,
    Home,
    Search,
    Subscriptions,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Paper,
    useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLoginPage } from "../state/state";

const BottomToolbar = () => {
    const [value, setValue] = useState(0);
    const isMobileScreen = useMediaQuery("(max-width:750px)");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handleClick = () => {
        if (!user) {
            dispatch(setLoginPage());
        } else {
            navigate(`/profile/${user._id}`);
        }
    };

    return (
        isMobileScreen && (
            <Paper
                sx={{
                    position: "fixed",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: "100%",
                    zIndex: "111",
                }}
                elevation={3}
            >
                <Box>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <BottomNavigationAction
                            label="Home"
                            icon={<Home />}
                            onClick={() => navigate("/")}
                        />

                        <BottomNavigationAction
                            label="Community"
                            icon={<Groups2 />}
                            onClick={() => navigate("/communities")}
                        />

                        <BottomNavigationAction
                            label="Search"
                            icon={<Search />}
                            onClick={() => navigate("/search")}
                        />
                        <BottomNavigationAction
                            label="Courses"
                            icon={<Subscriptions />}
                            onClick={() => navigate("/courses")}
                        />
                        <BottomNavigationAction
                            label="Profile"
                            icon={<AccountCircleRounded />}
                            onClick={handleClick}
                        />
                    </BottomNavigation>
                </Box>
            </Paper>
        )
    );
};

export default BottomToolbar;
