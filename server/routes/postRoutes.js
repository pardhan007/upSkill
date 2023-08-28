import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createPost, getCommunityPosts, getFeedPosts, getUserPosts } from "../controllers/postController.js";

const router = express.Router();

/* READ */

router.get("/feedposts", getFeedPosts);
router.get("/userposts/:id", getUserPosts);
router.get("/communityposts/:id", getCommunityPosts);

/* CREATE */
router.post("/createpost", verifyToken, createPost);

/* UPDATE */


export default router;
