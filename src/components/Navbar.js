import React from "react";
import Widget from "./customComponents/Widget";
import {
    Box,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Groups2, Home, Search, Subscriptions } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const { palette } = useTheme();
    const main = palette.primary.main;
    const isTabletScreen = useMediaQuery("(max-width:1080px)");
    return (
        <Widget>
            <Paper elevation={3}>
                <Box padding="1rem">
                    <MenuList>
                        <MenuItem onClick={() => navigate("/")}>
                            <ListItemIcon>
                                <Home sx={{ color: main }} />
                            </ListItemIcon>
                            <ListItemText>Home</ListItemText>
                        </MenuItem>
                        <MenuItem
                            onClick={() =>
                                isTabletScreen && navigate("/communities")
                            }
                        >
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
                </Box>
            </Paper>
        </Widget>
    );
};

export default Navbar;
