import QuestionModel from "../models/Question.js";
import mongoose from "mongoose";

export const AskQuestion = async (req, res) => {
  try {
    const postQuestionData = req.body;
    var date = new Date();

    date.setHours(1, 1, 1, 1);

    postQuestionData.Ondate = date;
    const postQuestion = await new QuestionModel(postQuestionData).save();

    res.status(200).json("Posted a Question Successfully");
  } catch (error) {
    console.log(error);
    res.status(400).json("Couldn't post a new question");
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questionList = await QuestionModel.find();
    res.status(200).json(questionList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable....");
  }

  try {
    await QuestionModel.findByIdAndRemove(_id);
    res.status(200).json({ message: "successfully deleted..." });
  } catch (error) {
    console.log(error);
  }
};

export const voteQuestion = async (req, res) => {
  const { id: _id } = req.params;
  const { value, userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }

  try {
    const question = await QuestionModel.findById(_id);
    const upIndex = question.upVote.findIndex((id) => id === String(userId));
    const downIndex = question.downVote.findIndex(
      (id) => id === String(userId)
    );

    if (value === "upVote") {
      if (downIndex !== -1) {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
      if (upIndex === -1) {
        question.upVote.push(userId);
      } else {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
    }

    if (value === "downVote") {
      if (upIndex !== -1) {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
      if (downIndex === -1) {
        question.downVote.push(userId);
      } else {
        question.downVote = question.downVoteVote.filter(
          (id) => id !== String(userId)
        );
      }
    }

    await QuestionModel.findByIdAndUpdate(_id, question);

    res.status(200).json({ message: "Successfully voted...." });
  } catch (error) {
    console.log(error);
  }
};

export const checkQuestionsonDay = async (req, res) => {
  var date = new Date();
  date.setHours(1, 1, 1, 1);
  const { id: _id } = req.params;

  try {
    const questionList = await QuestionModel.find({
      $and: [
        {
          userId: _id,
        },
        { Ondate: date },
      ],
    });
    res.status(200).json(questionList);
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: "false", message: error.message });
  }
};
