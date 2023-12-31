import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
    editProfile,
    follow,
    getAllUsers,
    getUser,
    getUserFollowers,
    getUserFollowing,
    unFollow,
} from "../controllers/userController.js";

const router = express.Router();

/* READ */

router.get("/allusers", getAllUsers);
router.get("/profile/:id", getUser);
router.get("/profile/:id/followers", getUserFollowers);
router.get("/profile/:id/following", getUserFollowing);

/* UPDATE */
router.patch("/editprofile", verifyToken, editProfile);
router.patch("/follow", verifyToken, follow);
router.patch("/unfollow", verifyToken, unFollow);

export default router;
