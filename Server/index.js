import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import connectDB from "./config/db.js";
import UserRoutes from "./routes/users.js";
import QuestionRoutes from "./routes/Question.js";
import answerRoutes from "./routes/Answer.js";
import bodyParser from "body-parser";
import postRouter from "./routes/posts.js";
import cloudinary from "cloudinary";
connectDB();

cloudinary.v2.config({
  cloud_name: "dzf2bn5ws",
  api_key: "976119987757764",
  api_secret: "***************************",
});

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));

app.use(cors());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
export const instance = new Razorpay({
  key_id: "rzp_test_sgdK1uHHwrzcFi",
  key_secret: "X9tCCmCavSYEQ1GhYKFvn75K",
});
app.use("/user", UserRoutes);
app.use("/questions", QuestionRoutes);
app.use("/answer", answerRoutes);
app.use("/post", postRouter);
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(5000, () => {
  console.log("Server run at Port 5000");
});
