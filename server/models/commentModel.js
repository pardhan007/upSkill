import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    {
        postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
        postId: { type: mongoose.Schema.ObjectId, ref: "Post" },
        text: {
            type: String,
            trim: true,
            min: 1,
            maxLength: 200,
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
