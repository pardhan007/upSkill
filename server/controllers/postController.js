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
    try {
        const posts = await Post.find({ isCommunityPost: false });
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

export const likePost = async (req, res) => {
    try {
        const { postId } = req.body;
        const post = await Post.findById(postId);

        if (post.likes.includes(req.user._id)) {
            res.status(400);
            throw new Error("Already Liked");
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
                $push: { likes: req.user._id },
            },
            {
                new: true,
            }
        );
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const unLikePost = async (req, res) => {
    try {
        const { postId } = req.body;
        const post = await Post.findById(postId);

        if (!post.likes.includes(req.user._id)) {
            res.status(400);
            throw new Error("post already not liked");
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
                $pull: { likes: req.user._id },
            },
            {
                new: true,
            }
        );
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getPostComments = async (req, res) => {
    try {
        const { postid } = req.params;
        if (!postid) {
            res.status(400);
            throw new Error("post id not provided");
        }
        const comments = await Comment.find({ postId: postid });
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

        await newComment.save();

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
                $push: { comments: newComment._id },
            },
            {
                new: true,
            }
        )
            .populate("comments", "text postedBy")
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "comments.postedBy",
                    select: "name email username",
                });

                res.status(200).json(results);
            });
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
        )
            .populate("comments", "text postedBy")
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "comments.postedBy",
                    select: "name email username",
                });

                res.status(200).json(results);
            });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};