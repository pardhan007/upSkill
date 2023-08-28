import Post from "../models/postModel.js";

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




