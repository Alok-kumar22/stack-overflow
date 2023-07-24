import mongoose from "mongoose";

const postSchema = mongoose.Schema({
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
  photo: {
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

export default mongoose.model("PostMessage", postSchema);
