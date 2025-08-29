import mongoose, { Schema } from "mongoose";

const collegeScheme = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      lowercase: true,
    },
    courses: {
      type: String,
    },
    overallRating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  },
  { timestamps: true }
);

export const College = mongoose.model("College", collegeScheme);
