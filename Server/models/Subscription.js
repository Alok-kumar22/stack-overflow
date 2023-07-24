import mongoose from "mongoose";

const subSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  plan: { type: String, required: true },
  subDate: { type: Date, default: Date.now },
  expDate: { type: Date, default: Date.now },
});

export default mongoose.model("subPlain", subSchema);
