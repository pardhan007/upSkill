import mongoose from "mongoose";

const communitySchema = mongoose.Schema(
    {
        communityName: {
            type: String,
            trim: true,
            required: "community name is required",
            maxLength: 50
        },
        description: {
            type: String,
            maxLength: 200,
        },
        communityPic: {
            type: String,
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        members: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
        admin: { type: mongoose.Schema.ObjectId, ref: "User" },
        announcement: { type: Array, default: [] },
    },
    { timestamps: true }
);

const Community = mongoose.model("Community", communitySchema);

export default Community;
