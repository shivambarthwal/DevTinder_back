const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(

  // if we create index then it will be faster, MongoDB will create index for unique fields automatically
  {
    firstName: { type: String, required: true, minLength: 3, maxLength: 40 },
    lastName: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    password: { type: String, required: true },
    age: { type: Number, min: 18, max: 100 },
    gender: {
      type: String,
      validate(value) {
        if (value !== "male" && value !== "female" && value !== "other")
          throw new Error("Invalid Gender");
      },
    },
    isPremium: { type: Boolean, default: false },
    membershipType:{
      type: String,
    },
    photoUrl: {
      type: String,
      default: "https://www.freeiconspng.com/img/13470",
      validate(value) {
        if (!validator.isURL(value)) throw new Error("Invalid URL");
      },
    },
    about: { type: String, default: "I am a developer" },
    skills: { type: [String] },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  // if we use arrow function this will not work
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "dev@tinder", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (password) {
  // password is what user have insert ,
  // user.password is what we have in database or our hash password (bcrypt)
  const user = this;
  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
