import React from "react";
import AllUserList from "../AllUserList";
import { Box } from "@mui/material";

const SearchedUserPage = () => {
    return (
        <Box overflow="auto">
            <AllUserList />
        </Box>
    );
};

export default SearchedUserPage;
