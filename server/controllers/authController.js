import bcrypt from "bcrypt";
import generateToken from "../config/generateToken.js";
import User from "../models/userModel.js";

/* REGISTER USER */

export const register = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;
        if (!name || !email || !password || !username) {
            res.status(400);
            throw new Error("Please Enter all the Fields");
        }

        const userExists = await User.findOne({
            $or: [{ email: email }, { username: username }],
        });

        if (userExists) {
            res.status(400);
            throw new Error("User already Exists");
        }

        const salt = await bcrypt.genSalt();

        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            username,
            password: passwordHash,
        });
        const savedUser = await newUser.save();
        res.status(201).json("Successfully Signed Up!");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* LOGIN USER */

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400);
            throw new Error("Please Enter all the Fields");
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ msg: "User dose not exist." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        const token = generateToken(user._id);

        res.status(200).json({
            token: token,
            username: user.username,
            name: user.name,
            email: user.email,
            userPic: user.userPic,
            following: user.following,
            followers: user.followers,
            github: user.github,
            linkedin: user.linkedin,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
