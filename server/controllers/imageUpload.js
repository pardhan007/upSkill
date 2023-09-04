import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET,
    secure: true,
});

export const handleImageUpload = async (req, res) => {
    cloudinary.uploader
        .upload_stream({ folder: "learninguploads" }, (error, result) => {
            if (error) {
                console.error("Error uploading image:", error);
                return res.status(500).json({ error: "Image upload failed" });
            }

            const imageUrl = result.secure_url;
            res.json({ url: imageUrl });
        })
        .end(req.file.buffer);
};
