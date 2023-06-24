import mongoose from "mongoose";
import QuestionModel from "../models/Question.js";
export const postAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { noOfAnswers, answerBody, userAnswered, userId } = req.body;
  console.log(noOfAnswers);
  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(404).send("Question unavailable...");
  }
  updateNoOfQuestions(_id, noOfAnswers);
  try {
    const updateQuestion = await QuestionModel.findByIdAndUpdate(_id, {
      $addToSet: { answer: [{ answerBody, userAnswered, userId }] },
    });
    res.status(200).json(updateQuestion);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const updateNoOfQuestions = async (_id, noOfAnswers) => {
  try {
    await QuestionModel.findByIdAndUpdate(
      _id,
      {
        $set: {
          noOfAnswers: noOfAnswers,
        },
      },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { answerId, noOfAnswers } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.stautus(404).send("Question Unavailable");
  }
  updateNoOfQuestions(_id, noOfAnswers);
  try {
    await QuestionModel.updateOne(
      { _id },
      { $pull: { answer: { _id: answerId } } }
    );

    res.status(200).json({ message: "Successfully deletd...." });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
};
