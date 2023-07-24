import postMessage from "../models/postMessage.js";
import fs from "fs";
export const createPost = async (req, res) => {
  const postQuestionData = req.fields;
  const { photo } = req.files;

  try {
    const postQuestion = await new postMessage(postQuestionData);

    if (photo) {
      postQuestion.photo.data = fs.readFileSync(photo.path);
      postQuestion.photo.contentType = photo.type;
    }

    await postQuestion.save();
    res.status(200).json("Posted a Question Successfully");
  } catch (error) {
    console.log(error);
    res.status(404).send({ success: false, message: "Error in post", error });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const questionList = await postMessage.find().select("-photo");
    res.status(200).json(questionList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getUserpost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const questionList = await postMessage
      .find({ userId: _id })
      .select("-photo");
    res.status(200).json(questionList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const photoController = async (req, res) => {
  try {
    const post = await postMessage.findById(req.params.pid).select("photo");
    if (post.photo.data) {
      res.set("Content-type", post.photo.contentType);
      return res.status(200).send(post.photo.data);
    }
    res.status(404).send("No photo found");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: "false",
      error,
    });
  }
};
export const commentController = async (req, res) => {
  const { id: _id } = req.params;
  const { userName, comment } = req.body;
  try {
    const updateQuestion = await postMessage.findByIdAndUpdate(_id, {
      $addToSet: { comments: [{ userName, comment }] },
    });
    return res.status(200).json("The post has been liked");
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      error,
    });
  }
};
export const likeController = async (req, res) => {
  const { id: _id } = req.params;
  const { userId } = req.body;
  try {
    const post = await postMessage.findById(_id);
    if (!post.likeCount.includes(userId)) {
      await post.updateOne({ $push: { likeCount: userId } });
      return res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likeCount: userId } });
      res.status(200).json("File is been unliked");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: "false",
      error,
    });
  }
};
