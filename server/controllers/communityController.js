import Community from "../models/communityModel.js";

export const createCommunity = async (req, res) => {
    try {
        const { communityName, description, communityPic } = req.body;

        const communityExists = await Community.findOne({ communityName });

        if (communityExists) {
            res.status(400);
            throw new Error("Community already Exists");
        }
        const newCommunity = new Community({
            communityName,
            description,
            admin: req.user._id,
            communityPic,
        });

        await newCommunity.save();
        res.status(201).json(newCommunity);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

export const getAllCommunity = async (req, res) => {
    try {
        const communities = await Community.find();
        res.status(200).json(communities);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getCommunity = async (req, res) => {
    try {
        const { id } = req.params;
        const community = await Community.findById(id);
        res.status(200).json(community);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const joinCommunity = async (req, res) => {
    try {
        const { communityId } = req.body;
        if (!communityId) {
            res.status(400);
            throw new Error("There is no community id provided.");
        }
        const community = await Community.findById(communityId);

        if (community.members.includes(req.user._id)) {
            res.status(400);
            throw new Error("Already Joined");
        }

        const updatedCommunity = await Community.findByIdAndUpdate(
            communityId,
            {
                $push: { members: req.user._id },
            },
            {
                new: true,
            }
        );

        res.status(200).json(updatedCommunity);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const leaveCommunity = async (req, res) => {
    try {
        const { communityId } = req.body;
        if (!communityId) {
            res.status(400);
            throw new Error("There is no community id provided.");
        }
        const community = await Community.findById(communityId);

        if (!community.members.includes(req.user._id)) {
            res.status(400);
            throw new Error("Not Joined already");
        }

        const updatedCommunity = await Community.findByIdAndUpdate(
            communityId,
            {
                $pull: { members: req.user._id },
            },
            {
                new: true,
            }
        );

        res.status(200).json(updatedCommunity);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createAnnouncement = async (req, res) => {
    const { communityId, announcementText } = req.body;
    try {
        const community = await Community.findOne({ _id: communityId });

        if (!community) {
            return res.status(404).json({ error: "Community not found" });
        }

        community.announcement.push(announcementText);

        const updatedCommunity = await community.save();

        res.status(200).json(updatedCommunity);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};
