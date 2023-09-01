import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CourseCard from "../cards/CourseCard";

const CoursesPage = () => {
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        const getAllCourses = async () => {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}/api/course/allcourses`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            setCourses(data);
        };
        getAllCourses();
    }, []);

    return (
        <Box
            display="flex"
            flexDirection="column"
            rowGap="1rem"
            overflow="auto"
            // height="100dvh"
            paddingBottom="2rem"
            sx={{
                scrollBehavior: "smooth",
            }}
        >
            {courses?.map((course) => (
                <CourseCard
                    key={course._id}
                    coursePic={course.coursePic}
                    courseName={course.courseName}
                    price={course.price}
                    joinedMembers={course.members.length}
                />
            ))}
        </Box>
    );
};

export default CoursesPage;
