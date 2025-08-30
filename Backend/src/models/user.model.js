import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
    fullName: {
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
)

// Hash password before saving the user
userSchema.pre("save", async function(next){
  // agar password modify nhi hua to next
  if(!this.isModified("password")) return next();
  // hash the password
  this.password = await bcrypt.hash(this.password, process.env.SALT_ROUNDS || 10)
  next();
})

// method to check if password is correct
userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password) // true/false
}

// method to generate access token
// userSchema.methods.generateAccessToken = function(){
//      return jwt.sign({*payload*},ACCESS_TOKEN_SECRET,{expiresIn})
// }
userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
    {
      _id: this._id, 
      email: this.email,
      username: this.username,
      fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m'
    }
  )
}

// method to generate refresh token
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
      _id: this._id, // usually refresh token me kam info rakhte hai
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expireIn: process.env.REFRESH_TOKEN_EXPIRY || '7d'
    }
  )
}


export const User = mongoose.model("User", userSchema);
