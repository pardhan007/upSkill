import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CourseCard from "../cards/CourseCard";
import CourseCardSkeleton from "../skeletons/CourseCardSkeleton";

const CoursesPage = () => {
    const [courses, setCourses] = useState(null);
    const [loading, setLoading] = useState(true);

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
            setLoading(false);
        };
        getAllCourses();
    }, []);

    return (
        <>
            {!loading ? (
                <Box
                    display="flex"
                    flexDirection="column"
                    rowGap="1rem"
                    overflow="auto"
                    // height="72dvh"
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
            ) : (
                <Box display="flex" flexDirection="column" gap="1rem">
                    {Array.from({ length: 10 }, (_, index) => (
                        <CourseCardSkeleton key={index} />
                    ))}
                </Box>
            )}
        </>
    );
};

export default CoursesPage;
