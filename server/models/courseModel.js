import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
    {
        courseName: {
            type: String,
            trim: true,
            required: "course name is required",
            maxLength: 50
        },
        coursePic: {
            type: String,
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        members: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
        price: {
            type: String,
            trim: true,
            default: "Free",
        },
    },
    { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
