import express from "express";

import {
  AskQuestion,
  getAllQuestions,
  deleteQuestion,
  voteQuestion,
} from "../controller/Questions.js";
const router = express.Router();

router.post("/Ask", AskQuestion);
router.get("/get", getAllQuestions);
router.delete("/delete/:id", deleteQuestion);
router.patch("/vote/:id", voteQuestion);
export default router;
