import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import postRoutes from "./routes/postRoutes.js";

/* CONFIGURATIONS */

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());

/* Database Connection */

connectDB();

/* ROUTES */

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/post", postRoutes);

/* PORT */

const PORT = process.env.PORT || 4142;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Api is Working");
});
