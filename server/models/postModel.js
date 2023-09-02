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
            default: "",
        },
        comments: [{ type: mongoose.Schema.ObjectId, ref: "Comment" }],
        likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
        isCommunityPost: { type: Boolean, default: false },
        communityId: { type: mongoose.Schema.ObjectId, ref: "Community" },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
