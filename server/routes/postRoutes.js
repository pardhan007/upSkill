import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
    comment,
    createPost,
    getCommunityPosts,
    getFeedPosts,
    getPostComments,
    getUserPosts,
    likePost,
    unComment,
    unLikePost,
} from "../controllers/postController.js";

const router = express.Router();

/* READ */

router.get("/feedposts", getFeedPosts);
router.get("/userposts/:id", getUserPosts);
router.get("/communityposts/:id", getCommunityPosts);
router.get("/postcomments/:postid", getPostComments);

/* CREATE */
router.post("/createpost", verifyToken, createPost);
router.post("/comment", verifyToken, comment);
router.post("/uncomment", verifyToken, unComment);

/* UPDATE */
router.patch("/likepost", verifyToken, likePost);
router.patch("/unlikepost", verifyToken, unLikePost);

export default router;
