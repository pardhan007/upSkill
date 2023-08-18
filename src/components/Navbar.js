import React from "react";
import Widget from "./Widget";
import {
    Box,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
} from "@mui/material";
import { Groups2, Home, Search, Subscriptions } from "@mui/icons-material";

const Navbar = () => {
    return (
        <Widget>
            <Paper elevation={3}>
                <Box padding="1rem">
                    <MenuList>
                        <MenuItem>
                            <ListItemIcon>
                                <Home color="string" />
                            </ListItemIcon>
                            <ListItemText>Home</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <Groups2 />
                            </ListItemIcon>
                            <ListItemText>Community</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <Search />
                            </ListItemIcon>
                            <ListItemText>Search</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <Subscriptions />
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
