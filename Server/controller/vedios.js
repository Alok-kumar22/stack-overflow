import vedioUpload from "../models/vedioUpload.js";
import fs from "fs";
export const uploadController = async (req, res) => {
  const postQuestionData = req.fields;
  console.log(postQuestionData);
  const { vedio } = req.files;
  try {
    const postQuestion = await new vedioUpload(postQuestionData);

    if (vedio) {
      postQuestion.vedio.data = fs.readFileSync(vedio.path);
      postQuestion.vedio.contentType = vedio.type;
    }

    await postQuestion.save();
    res.status(200).json("Posted a Vedio Successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: "false",
      error,
    });
  }
};

export const getAllVedios = async (req, res) => {
  try {
    const questionList = await vedioUpload.find().select("-vedio");
    res.status(200).json(questionList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const vedioController = async (req, res) => {
  try {
    const post = await vedioUpload.findById(req.params.pid).select("vedio");
    if (post.vedio.data) {
      res.set("Content-type", post.vedio.contentType);
      return res.status(200).send(post.vedio.data);
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
export const vediocommentController = async (req, res) => {
  const { id: _id } = req.params;
  const { userName, comment } = req.body;
  try {
    const updateQuestion = await vedioUpload.findByIdAndUpdate(_id, {
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
export const vediolikeController = async (req, res) => {
  const { id: _id } = req.params;
  const { userId } = req.body;
  try {
    const post = await vedioUpload.findById(_id);
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
