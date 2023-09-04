import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import User from "../models/userModel.js";

export const createPost = async (req, res) => {
    try {
        const { content, postPic, isCommunityPost, communityId } = req.body;

        const newPost = new Post({
            content,
            postPic,
            isCommunityPost,
            communityId,
            postedBy: req.user._id,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

export const getFeedPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    try {
        const posts = await Post.find({ isCommunityPost: false })
            .skip((page - 1) * perPage)
            .limit(perPage)
            .populate({
                path: "postedBy",
                select: "name userPic username",
            })
            .sort({ createdAt: -1 })
            .populate({
                path: "likes",
                select: "name userPic username",
            });
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const userPosts = await Post.find({ postedBy: id });
        res.status(200).json(userPosts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getCommunityPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const communityPosts = await Post.find({ communityId: id });
        res.status(200).json(communityPosts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const likeDislikePost = async (req, res) => {
    try {
        const { postId } = req.body;
        const post = await Post.findById(postId);

        if (post.likes.includes(req.user._id)) {
            const updatedPost = await Post.findByIdAndUpdate(
                postId,
                {
                    $pull: { likes: req.user._id },
                },
                {
                    new: true,
                }
            ).populate({
                path: "likes",
                select: "name userPic username",
            });
            res.status(200).json(updatedPost.likes);
        } else {
            const updatedPost = await Post.findByIdAndUpdate(
                postId,
                {
                    $push: { likes: req.user._id },
                },
                {
                    new: true,
                }
            ).populate({
                path: "likes",
                select: "name userPic username",
            });
            res.status(200).json(updatedPost.likes);
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getPostComments = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const { postid } = req.params;
    const perPage = 5;
    try {
        if (!postid) {
            res.status(400);
            throw new Error("post id not provided");
        }
        const comments = await Comment.find({ postId: postid })
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 })
            .populate("postedBy", "username userPic");
        res.status(200).json(comments);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const comment = async (req, res) => {
    try {
        const { text, postId } = req.body;

        if (!text || !postId) {
            res.status(400);
            throw new Error("text or postId not provided");
        }

        const newComment = new Comment({
            text,
            postId,
            postedBy: req.user._id,
        });

        const savedComment = await newComment.save();

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
                $push: { comments: newComment._id },
            },
            {
                new: true,
            }
        );
        await savedComment.populate("postedBy", "username userPic");
        res.status(200).json(savedComment);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const unComment = async (req, res) => {
    try {
        const { commentId, postId } = req.body;

        if (!commentId || !postId) {
            res.status(400);
            throw new Error("comment or post not provided");
        }

        await Comment.findByIdAndRemove(commentId);

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
                $pull: { comments: commentId },
            },
            {
                new: true,
            }
        );
        res.status(200).json({ msg: "Successfully deleted" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
