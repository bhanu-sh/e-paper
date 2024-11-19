import mongoose from "mongoose";

const paperSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    url: {
      type: String,
      required: true,
    },
    newsDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Paper = mongoose.models.papers || mongoose.model("papers", paperSchema);

export default Paper;
