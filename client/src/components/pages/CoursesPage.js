import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CourseCard from "../cards/CourseCard";
import CourseCardSkeleton from "../skeletons/CourseCardSkeleton";

const CoursesPage = ({ search }) => {
    const [courses, setCourses] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(null);
    const queryParams = search ? `?search=${search}` : "";

    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
            getAllCourses();
        }, 300);

        setTimer(newTimer);

        return () => {
            if (newTimer) {
                clearTimeout(newTimer);
            }
        };
    }, [search]);

    const getAllCourses = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}/api/course/allcourses${queryParams}`,
                {
                    method: "GET",
                }
            );
            if (!response.ok) {
                throw new Error("Failed to fetch courses");
            }
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
        setLoading(false);
    };

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
