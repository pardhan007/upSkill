import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
    createCourse,
    getAllCourses,
    getCourse,
    joinCourse,
} from "../controllers/courseController.js";

const router = express.Router();

/* READ */

router.get("/get/:id", getCourse);
router.get("/allcourses", getAllCourses);

/* CREATE */

router.post("/create", verifyToken, createCourse);

/* UPDATE */
router.patch("/joincourse", verifyToken, joinCourse);

export default router;
