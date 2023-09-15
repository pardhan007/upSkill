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

import CoursesPage from "./CoursesPage";
import CommunitiesList from "../CommunitiesList";
import { Route, Routes, useNavigate } from "react-router-dom";

const SearchPage = () => {
    const [value, setValue] = useState("people");
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setSearch("");
    };
    const { palette } = useTheme();
    const bordercolor = palette.primary.bordercolor;
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

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
                value={search}
                fullWidth
                onChange={(e) => setSearch(e.target.value)}
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
                        sx={{ flex: 1, fontWeight: "600" }}
                        onClick={() => navigate("people")}
                    />
                    <Tab
                        value="communities"
                        label="Communities"
                        sx={{ flex: 1, fontWeight: "600" }}
                        onClick={() => navigate("communities")}
                    />
                    <Tab
                        value="courses"
                        label="Courses"
                        sx={{ flex: 1, fontWeight: "600" }}
                        onClick={() => navigate("courses")}
                    />
                </Tabs>
            </Box>
            <Routes>
                <Route
                    path="people"
                    element={<SearchedUserPage search={search} />}
                />
                <Route
                    path="communities"
                    element={<CommunitiesList search={search} />}
                />
                <Route
                    path="courses"
                    element={<CoursesPage search={search} />}
                />
            </Routes>
        </Box>
    );
};

export default SearchPage;
