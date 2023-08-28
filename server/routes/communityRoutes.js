import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
    createCommunity,
    getAllCommunity,
    getCommunity,
    joinCommunity,
    leaveCommunity,
} from "../controllers/communityController.js";

const router = express.Router();

/* READ */

router.get("/get/:id", verifyToken, getCommunity);
router.get("/allcommunities", verifyToken, getAllCommunity);

/* CREATE */

router.post("/create", verifyToken, createCommunity);

/* UPDATE */
router.patch("/join", verifyToken, joinCommunity);
router.patch("/leave", verifyToken, leaveCommunity);

export default router;
