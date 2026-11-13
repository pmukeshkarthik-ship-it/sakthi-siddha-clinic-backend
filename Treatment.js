import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, default: "Traditional care", trim: true },
  description: { type: String, required: true, maxlength: 2000 },
  imageUrl: { type: String, default: "" },
  isPublished: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model("Treatment", schema);
