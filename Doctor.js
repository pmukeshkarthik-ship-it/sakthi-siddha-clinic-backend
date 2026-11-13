import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  qualifications: [{ type: String, trim: true }],
  designation: { type: String, trim: true },
  bio: { type: String, default: "", maxlength: 2000 },
  photoUrl: { type: String, default: "" },
  isPublished: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model("Doctor", schema);
