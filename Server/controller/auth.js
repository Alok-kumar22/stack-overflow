import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import users from "../models/auth.js";
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existuser = await users.findOne({ email });
    if (existuser) {
      return res.status(404).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newuser = await new users({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(200).json({ result: newuser });
  } catch (error) {
    console.log(error);
    res.status(400).json("Something went wrong....");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await users.findOne({ email });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User Not exist",
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, "test", {
      expiresIn: "50d",
    });

    res.status(200).json({ result: user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

export const followings = async (req, res) => {
  const { id: _id } = req.params;
  const { userId, userName } = req.body;

  try {
    const userupdate = await users.findByIdAndUpdate(_id, {
      $addToSet: {
        following: [{ followingId: userId, followingName: userName }],
      },
    });
    const followeruser = await users.findByIdAndUpdate(userId, {
      $addToSet: {
        followers: [{ friendId: _id, friendName: userupdate.name }],
      },
    });
    res.status(200).json({ result: userupdate });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

export const deletefollowings = async (req, res) => {
  const { id: _id } = req.params;
  const { userId } = req.body;
  try {
    await users.updateOne(
      { _id },
      { $pull: { following: { followingId: userId } } }
    );
    await users.updateOne(
      { _id: userId },
      { $pull: { followers: { friendId: _id } } }
    );
    res.status(200).json({ message: "Successfully deletd...." });
  } catch (error) {
    console.log(error);
    res.status(404).send({ success: "false", error });
  }
};
