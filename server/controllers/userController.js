import User from "../models/userModel.js";


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.find({ username }).select("-password");
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const editProfile = async (req, res) => {
    try {
        const { name, userPic, bio, github, linkedin } = req.body;
        if (!name) {
            res.status(400);
            throw new Error("name field can't be empty");
        }
        const updatedProfile = await User.findByIdAndUpdate(
            req.user._id,
            {
                name: name,
                bio: bio,
                github: github,
                linkedin: linkedin,
                userPic: userPic,
            },
            {
                new: true,
            }
        ).select("-password");
        res.status(200).json(updatedProfile);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const follow = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            res.status(400);
            throw new Error("There is no id of other person.");
        }
        if (req.user.following.includes(id)) {
            res.status(400);
            throw new Error("Already following");
        }
        const updatedProfile = await User.findByIdAndUpdate(
            req.user._id,
            {
                $push: { following: id },
            },
            {
                new: true,
            }
        )
            .select("-password")
            .populate("following", "name username email");

        await User.findByIdAndUpdate(
            id,
            {
                $push: { followers: req.user._id },
            },
            {
                new: true,
            }
        );
        res.status(200).json(updatedProfile);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const unFollow = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            res.status(400);
            throw new Error("There is no id of other person.");
        }
        if (!req.user.following.includes(id)) {
            res.status(400);
            throw new Error("Not following already");
        }
        const updatedProfile = await User.findByIdAndUpdate(
            req.user._id,
            {
                $pull: { following: id },
            },
            {
                new: true,
            }
        )
            .select("-password")
            .populate("following", "name username email");

        await User.findByIdAndUpdate(
            id,
            {
                $pull: { followers: req.user._id },
            },
            {
                new: true,
            }
        );
        res.status(200).json(updatedProfile);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

