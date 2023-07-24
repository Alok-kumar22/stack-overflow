import mongoose from "mongoose";
import user from "../models/auth.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await user.find();
    const allUserDeatils = [];
    allUsers.forEach((users) => {
      allUserDeatils.push({
        _id: users._id,
        name: users.name,
        about: users.about,
        tags: users.tags,
        followers: users.followers,
        following: users.following,
        joinedOn: users.joinedOn,
      });
    });

    res.status(200).json(allUserDeatils);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  const { name, about, tags } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }
  try {
    const updatedProfile = await user.findByIdAndUpdate(
      _id,
      { $set: { name: name, about: about, tags: tags } },
      { new: true }
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
