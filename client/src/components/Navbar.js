import React from "react";
import {
    Box,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    useTheme,
} from "@mui/material";
import { Groups2, Home, Search, Subscriptions } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { palette } = useTheme();
    const main = palette.primary.main;
    const navigate = useNavigate();

    return (
        <Box padding="1rem">
            <MenuList>
                <MenuItem onClick={() => navigate("/")}>
                    <ListItemIcon>
                        <Home sx={{ color: main }} />
                    </ListItemIcon>
                    <ListItemText>Home</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => navigate("/communities")}>
                    <ListItemIcon>
                        <Groups2 sx={{ color: main }} />
                    </ListItemIcon>
                    <ListItemText>Community</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => navigate("/search")}>
                    <ListItemIcon>
                        <Search sx={{ color: main }} />
                    </ListItemIcon>
                    <ListItemText>Search</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => navigate("/courses")}>
                    <ListItemIcon>
                        <Subscriptions sx={{ color: main }} />
                    </ListItemIcon>
                    <ListItemText>Courses</ListItemText>
                </MenuItem>
            </MenuList>
        </Box>
    );
};

export default Navbar;
