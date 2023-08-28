import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    {
        postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
        text: {
            type: String,
            min: 1,
            max: 100,
        },
        created: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
