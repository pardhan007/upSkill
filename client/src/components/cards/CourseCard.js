import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

const CourseCard = ({ coursePic, courseName, price, joinedMembers }) => {
    const { palette } = useTheme();
    const bordercolor = palette.primary.bordercolor;
    const lightdark = palette.primary.lightdark;
    return (
        <Box
            display="flex"
            columnGap="1rem"
            sx={{ boxShadow: " 0px 10px 15px -3px rgba(0,0,0,0.1)" }}
            border={`0.5px solid ${bordercolor}`}
            borderRadius="0.5rem"
        >
            <Box width="120px" height="68px">
                <img
                    src={coursePic}
                    alt="course_name"
                    style={{
                        width: "120px",
                        height: "68px",
                        objectFit: "cover",
                    }}
                />
            </Box>
            <Box>
                <Typography>{courseName}</Typography>
                <Typography color={lightdark}>{price}</Typography>
                <Typography fontSize="0.8rem">
                    {joinedMembers} Enrolled
                </Typography>
            </Box>
        </Box>
    );
};

export default CourseCard;
