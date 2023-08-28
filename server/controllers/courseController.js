import Course from "../models/courseModel.js";

export const createCourse = async (req, res) => {
    try {
        const { courseName, coursePic, price } = req.body;

        const courseExists = await Course.findOne({ courseName });

        if (courseExists) {
            res.status(400);
            throw new Error("Course already Exists");
        }
        const newCourse = new Course({
            courseName,
            coursePic,
            price,
        });

        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate(
            "members",
            "name username email"
        );
        res.status(200).json(courses);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id).populate(
            "members",
            "name username email"
        );
        res.status(200).json(course);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const joinCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        if (!courseId) {
            res.status(400);
            throw new Error("There is no course id provided.");
        }
        const course = await Course.findById(courseId).populate(
            "members",
            "name username email"
        );

        if (course.members.includes(req.user._id)) {
            res.status(400);
            throw new Error("Already Joined");
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: { members: req.user._id },
            },
            {
                new: true,
            }
        ).populate("members", "name username email");

        res.status(200).json(updatedCourse);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
