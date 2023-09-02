import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: "username is required",
            unique: "username already exists",
            minLength: 1,
            maxLength: 15,
        },
        name: {
            type: String,
            required: "Name is required",
            minLength: 1,
            maxLength: 30,
        },
        email: {
            type: String,
            trim: true,
            unique: "Email already exists",
            required: "Email is required",
            maxLength: 30,
            lowercase: true,
        },
        password: {
            type: String,
            required: "Password is required",
            minLength: 1,
        },
        userPic: {
            type: String,
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        following: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
        followers: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
        github: {
            type: String,
            default: "",
        },
        linkedin: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
            trim: true,
            maxLength: 200,
            default: "",
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
