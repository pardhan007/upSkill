import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
        content: {
            type: String,
            required: true,
            min: 1,
            max: 100,
        },
        postPic: {
            type: String,
        },
        comments: [
            {
                text: String,
                created: { type: Date, default: Date.now },
                postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
            },
        ],
        likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
        isCommunityPost: { type: Boolean, default: false },
        communityName: { type: String, default: "" },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
