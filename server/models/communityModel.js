import mongoose from "mongoose";

const communitySchema = mongoose.Schema(
    {
        communityName: {
            type: String,
            trim: true,
            required: "community name is required",
        },
        description: {
            type: String,
            min: 1,
            max: 200,
        },
        communityPic: {
            type: String,
        },
        members: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
        admin: { type: mongoose.Schema.ObjectId, ref: "User" },
        // posts: [{ type: mongoose.Schema.ObjectId, ref: "Post" }],
        announcement: { type: Array, default: [] },
    },
    { timestamps: true }
);

const Community = mongoose.model("Community", communitySchema);

export default Community;
