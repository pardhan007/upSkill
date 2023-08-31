import React from "react";
import Widget from "./customComponents/Widget";
import {
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Groups2, Home, Search, Subscriptions } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPageName } from "../state/state";

const Navbar = () => {
    const { palette } = useTheme();
    const main = palette.primary.main;
    const isTabletScreen = useMediaQuery("(max-width:1080px)");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (targetPage) => {
        if (targetPage === "posts") {
            navigate("/");
            dispatch(setPageName({ pagename: "Posts" }));
        } else if (targetPage === "communities") {
            navigate("/communities");
            dispatch(setPageName({ pagename: "Communities" }));
        }
    };

    return (
        <Widget padding="1rem">
            <MenuList>
                <MenuItem onClick={() => handleClick("posts")}>
                    <ListItemIcon>
                        <Home sx={{ color: main }} />
                    </ListItemIcon>
                    <ListItemText>Home</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleClick("communities")}>
                    <ListItemIcon>
                        <Groups2 sx={{ color: main }} />
                    </ListItemIcon>
                    <ListItemText>Community</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Search sx={{ color: main }} />
                    </ListItemIcon>
                    <ListItemText>Search</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Subscriptions sx={{ color: main }} />
                    </ListItemIcon>
                    <ListItemText>Courses</ListItemText>
                </MenuItem>
            </MenuList>
        </Widget>
    );
};

export default Navbar;
