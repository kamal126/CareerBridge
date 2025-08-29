import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullNme: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avtar: {
      type: String, // cloudnary url
      required: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    role: {
      type: String,
      enum: ["Student", "expert", "admin"],
      default: "Student",
    },
    college: {
      type: Schema.Types.ObjectId,
      ref: "College",
    },
    yearOfStudy: {
      type: Number,
      required: function () {
        return this.role === "Student";
      },
    },
    passingYear: {
      type: Number,
      required: function () {
        return this.role === "expert";
      },
    },
    bio: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
