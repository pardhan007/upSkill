import { SearchOutlined } from "@mui/icons-material";
import {
    Box,
    InputAdornment,
    Tab,
    Tabs,
    TextField,
    useTheme,
} from "@mui/material";
import React, { useState } from "react";
import SearchedUserPage from "./SearchedUserPage";
import CommunitiesPage from "./CommunitiesPage";
import CoursesPage from "./CoursesPage";

const SearchPage = () => {
    const [value, setValue] = useState("people");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const { palette } = useTheme();
    const bordercolor = palette.primary.bordercolor;
    const [currentPageName, setCurrentPageName] = useState("people");

    const handlePage = (targetPage) => {
        if (targetPage === "people") {
            return <SearchedUserPage />;
        } else if (targetPage === "communities") {
            return <CommunitiesPage />;
        } else if (targetPage === "courses") {
            return <CoursesPage />;
        }
    };

    return (
        <Box display="flex" flexDirection="column" gap="1rem">
            <TextField
                hiddenLabel
                size="small"
                variant="outlined"
                placeholder="Search"
                type="text"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchOutlined color="disabled" />
                        </InputAdornment>
                    ),
                }}
                fullWidth
            />
            <Box
                sx={{ width: "100%" }}
                padding="0.5rem 0.5rem"
                borderTop={`1px solid ${bordercolor}`}
                borderBottom={`1px solid ${bordercolor}`}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab
                        value="people"
                        label="People"
                        sx={{ flex: 1 }}
                        onClick={() => setCurrentPageName("people")}
                    />
                    <Tab
                        value="communities"
                        label="Communities"
                        sx={{ flex: 1 }}
                        onClick={() => setCurrentPageName("communities")}
                    />
                    <Tab
                        value="courses"
                        label="Courses"
                        sx={{ flex: 1 }}
                        onClick={() => setCurrentPageName("courses")}
                    />
                </Tabs>
            </Box>
            {handlePage(currentPageName)}
        </Box>
    );
};

export default SearchPage;
