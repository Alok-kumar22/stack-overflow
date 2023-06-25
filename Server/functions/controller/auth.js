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
