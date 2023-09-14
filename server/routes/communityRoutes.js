import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
    createAnnouncement,
    createCommunity,
    getAllCommunity,
    getCommunity,
    joinCommunity,
    leaveCommunity,
} from "../controllers/communityController.js";

const router = express.Router();

/* READ */

router.get("/get/:id", getCommunity);
router.get("/allcommunities", getAllCommunity);

/* CREATE */

router.post("/create", verifyToken, createCommunity);
router.post("/newannouncement", verifyToken, createAnnouncement);


/* UPDATE */
router.patch("/join", verifyToken, joinCommunity);
router.patch("/leave", verifyToken, leaveCommunity);

export default router;
