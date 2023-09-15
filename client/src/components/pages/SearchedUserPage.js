import React from "react";
import AllUserList from "../AllUserList";
import { Box } from "@mui/material";

const SearchedUserPage = ({ search }) => {
    return (
        <Box overflow="auto">
            <AllUserList search={search} />
        </Box>
    );
};

export default SearchedUserPage;
