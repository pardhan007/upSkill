import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
    editProfile,
    follow,
    getAllUsers,
    getUser,
    unFollow,
} from "../controllers/userController.js";

const router = express.Router();

/* READ */

router.get("/allusers", getAllUsers);
router.get("/profile/:id", verifyToken, getUser);

/* UPDATE */
router.patch("/editprofile", verifyToken, editProfile);
router.patch("/follow", verifyToken, follow);
router.patch("/unfollow", verifyToken, unFollow);

export default router;
