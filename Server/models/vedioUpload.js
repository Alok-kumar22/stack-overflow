import mongoose from "mongoose";

const vedioSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  userId: {
    type: String,
  },
  creator: {
    type: String,
  },
  tags: {
    type: [String],
  },
  vedio: {
    data: Buffer,
    contentType: String,
  },

  likeCount: {
    type: Array,
    default: [],
  },
  comments: [
    {
      userName: String,
      comment: String,
      giveOn: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("vedioUpload", vedioSchema);
