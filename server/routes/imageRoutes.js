import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { handleImageUpload } from "../controllers/imageUpload.js";
import multer from "multer";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
    "/image-upload",
    verifyToken,
    upload.single("image"),
    handleImageUpload
);

export default router;
