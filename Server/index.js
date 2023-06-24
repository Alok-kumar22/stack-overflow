import express from "express";

import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./config/db.js";
import UserRoutes from "./routes/users.js";
import QuestionRoutes from "./routes/Question.js";
import answerRoutes from "./routes/Answer.js";
connectDB();
const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/user", UserRoutes);
app.use("/questions", QuestionRoutes);
app.use("/answer", answerRoutes);
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(5000, () => {
  console.log("Server run at Port 5000");
});
