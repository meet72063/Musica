const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
    },
    date: {
      type: String,
    },
    month: {
      type: String,
    },
    year: {
      type: String,
    },
    gender: {
      type: String,
    },
    nickname: {
      type: String,
    },
    likedSongs: {
      type: Array,
      default: [],
    },
    Playlists: {
      type: Array,
      default: [],
    },
    country: {
      type: String,
      default: "India",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timeStamp: true }
);

userSchema.methods.generateToken = function () {
  return jwt.sign(
    { userId: this._id, name: this.name, isAdmin: this.isAdmin },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "1d" }
  );
};

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (password) {
  const isMatched = await bcrypt.compare(String(password), this.password);
  return isMatched;
};

const validation = (user) => {
  const Schema = joi.object({
    name: joi.string().required(),
    password: joi.string().min(6).required(),
    month: joi.string().allow(),
    Date: joi.string().allow(),
    year: joi.string().allow(),
    gender: joi
      .string()
      .valid("Male", "Female", "Non-binary", "Other", "")
      .allow(),
    email: joi.string().email().required(),
    isAdmin: joi.allow(),
    likedSongs: joi.array().allow(),
    Playlists: joi.array().allow(),
    nickname: joi.string().allow,
    country: joi.string().allow(),
  });

  return Schema.validate(user);
};

const User = mongoose.model("users", userSchema);

module.exports = { validation, User };
