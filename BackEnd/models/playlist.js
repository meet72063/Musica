const mongoose = require("mongoose");
const joi = require("joi");

const PlaylistSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    description: {
      type: String,
    },
    songs: {
      type: Array,
      default: [],
    },
    catogory: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const PlayList = mongoose.model("playlist", PlaylistSchema);

const playlistValidaion = (playList) => {
  const Schema = joi.object({
    name: joi.string().required(),
    description: joi.string().allow(),
    songs: joi.array().allow(),
  });

  return Schema.validate(playList);
};

module.exports = { PlayList, playlistValidaion };
