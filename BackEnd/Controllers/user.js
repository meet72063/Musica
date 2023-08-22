const { validation, User } = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const { Song } = require("../models/song");
const { PlayList, playlistValidaion } = require("../models/playlist");
const { Artist } = require("../models/Artist");
require("express-async-errors");

//sign Up
const creatUser = async (req, res) => {
  const { error } = validation(req.body);
  if (error) {
    let err = error.details[0].message;
    err.replaceAll("\\");
    res.status(StatusCodes.BAD_REQUEST).json({ messege: err.toUpperCase() });
    return;
  }

  const newUser = await User.create(req.body);
  const token = newUser.generateToken();
  res.status(StatusCodes.CREATED).json({ status: "successful", token });
};

//login
const logIn = async (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "please provide creadentials" });
    return;
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: "user not found " });
    return;
  }

  //compare password
  const isVarified = await user.comparePassword(password);
  if (!isVarified) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: "incorrect password" });
    return;
  }

  delete user._doc.password;
  const token = user.generateToken();
  res
    .status(StatusCodes.OK)
    .json({ status: "successful", token, data: user._doc });
};

//Delete user
const Delete = async (req, res) => {
  const {
    body: { password, email },
    user: { userId },
  } = req;

  //compare password
  const isVarified = await user.comparePassword(password);
  if (!isVarified) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: "incorrect password" });
    return;
  }

  const user = await User.findByIdAndDelete({ _id: userId });
  res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "user has been Deleted successfully" });
};

//Update user
const Update = async (req, res) => {
  const {
    body: { password, email },
    user: { userId },
  } = req;

  //hashing password to update
  if (password) {
    const salt = await bcrypt.genSalt(10);

    let hashedpassword = await bcrypt.hash(String(password), salt);
    req.body = { ...req.body, password: hashedpassword };
  }

  const user = await User.findByIdAndUpdate({ _id: userId }, req.body, {
    new: true,
  }).select("-password");
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "user has been updated successfully",
    data: user,
  });
};

//getting user details
const getUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId });
  res.status(StatusCodes.OK).json({ user });
};

//getting all songs
const getSongs = async (req, res) => {
  const songs = await Song.find({}).sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json({ songs });
};

// add/remove to/from liked songs
const updateLikedSongs = async (req, res) => {
  const {
    params: { songId },
    user: { userId },
  } = req;
  const { likedSongs } = await User.findById({ _id: userId });
  let index = likedSongs.indexOf(songId);
  if (index === -1) {
    likedSongs.push(songId);
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { likedSongs },
      { new: true }
    ).select("-password");
    res.status(StatusCodes.OK).json({
      message: " song has been added to your liked songs ",
      user,
      added: true,
    });
    return;
  }
  const updateSong = likedSongs.filter((item) => item !== likedSongs[index]);
  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { likedSongs: updateSong },
    { new: true }
  ).select("-password");

  res.status(StatusCodes.OK).json({
    message: "song has been removed from your liked songs",
    user,
    added: false,
  });
};

const favouriteSongs = async (req, res) => {
  const { userId } = req.user;
  const user = await User.updateOne(
    { _id: userId },
    {
      $set: {
        likedSongs: req.body,
      },
    }
  );
  res
    .status(StatusCodes.OK)
    .json({ message: "songs has been added seccessfully to favourites", user });
};

//making playlist
const newPlayList = async (req, res) => {
  const { error } = playlistValidaion(req.body);
  if (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.details[0].message });
    return;
  }

  const {
    body,
    user: { userId },
  } = req;
  const playListExist = await PlayList.findOne({
    user: userId,
    name: body.name,
  });
  if (playListExist !== null) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "playlist already exit with this name" });
    return;
  }
  const newplaylist = await PlayList.create({ user: userId, ...body });
  res
    .status(StatusCodes.OK)
    .json({ message: "New playlist created", newplaylist });
};

//Deleting playlist
const deltePlaylist = async (req, res) => {
  const {
    params: { playlistId },
    user: { userId },
  } = req;
  const deltedPlaylist = await PlayList.findOneAndDelete({
    _id: playlistId,
    user: userId,
  });
  res.status(StatusCodes.OK).json({
    message: "playlist has been deleted successfully",
    deltedPlaylist,
  });
};

//Editing playlist
const editPlaylist = async (req, res) => {
  const {
    params: { playlistId },
    user: { userId },
  } = req;
  await PlayList.findOneAndUpdate({ _id: playlistId, user: userId }, req.body);
  res
    .status(StatusCodes.OK)
    .json({ message: "playlist has been updated successfully" });
};

// adding song to playlist
const addSongtoPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  try {
    const playlist = await PlayList.findOneAndUpdate(
      { _id: playlistId },
      {
        $push: {
          songs: { ...req.body },
        },
      }
    );
    res.status(200).json({ playlist, msg: `song added to ${playlist}` });
  } catch (error) {
    res.status(401).json({ error });
  }
};

// removing song from playlist
const removeSongfromPlaylist = async (req, res) => {
  const {
    params: { playlistId },
    body: { songId },
  } = req;
  try {
    const updatedPlaylist = await PlayList.findOneAndUpdate(
      { _id: playlistId },
      {
        $pull: {
          songs: { _id: songId },
        },
      },
      { new: true }
    );

    res
      .status(StatusCodes.OK)
      .json({ playlist: updatedPlaylist, msg: "updated successfully" });
  } catch (error) {
    res
      .status(StatusCodes.NOT_MODIFIED)
      .json({ error, msg: "an error occured" });
  }
};

//getPlaylist
const getPlaylist = async (req, res) => {
  const {
    params: { playlistId },
    user: { userId },
  } = req;
  const playlist = await PlayList.findOne({ _id: playlistId, user: userId });
  if (playlist === null) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "No playlist with this id" });
    return;
  }
  res.status(StatusCodes.OK).json({ playlist });
};

//all playlist by the user
const getAllPlaylist = async (req, res) => {
  const { userId } = req.user;
  const playlists = await PlayList.find({ user: userId }).sort({
    createdAt: -1,
  });
  if (playlists === null) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "No playlist with this id" });
    return;
  }
  res.status(StatusCodes.OK).json({ playlists });
};

//getting all the aritsts
const getAllArtists = async (req, res) => {
  const response = await Artist.find({}).sort({ created_at: 1 });
  res.status(StatusCodes.OK).json({ artists: response, message: "successful" });
};

//getCatogries playlists
const getAllCatogriesPlaylist = async (req, res) => {
  try {
    const catogories = await PlayList.find({ catogory: true });
    res.status(StatusCodes.OK).json({ catogories, status: "success" });
  } catch (error) {
    console.log(error);
  }
};

//download song
const getDownloadSongURl = async (req, res) => {
  const { audioUrl } = req.params;
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${encodeURIComponent(audioUrl)}`
  );
  res.setHeader("content-Type", "audio/mpeg");
  res.status(200).json({ audioUrl });
};

module.exports = {
  creatUser,
  logIn,
  Delete,
  Update,
  updateLikedSongs,
  getUser,
  getSongs,
  newPlayList,
  deltePlaylist,
  editPlaylist,
  getPlaylist,
  getAllPlaylist,
  getAllArtists,
  favouriteSongs,
  getAllCatogriesPlaylist,
  addSongtoPlaylist,
  removeSongfromPlaylist,
  getDownloadSongURl,
};
