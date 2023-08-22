const express = require("express");
const router = express.Router();
const { userAuth } = require("../middleware/userAuth");
const {
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
  addingSongs,
  getAllArtists,
  favouriteSongs,
  getAllCatogriesPlaylist,
  addSongtoPlaylist,
  removeSongfromPlaylist,
  getDownloadSongURl,
} = require("../Controllers/user");

router.route("/signUp").post(creatUser);
router.route("/login").post(logIn);
router.route("/delete").delete(userAuth, Delete);
router.route("/update").patch(userAuth, Update);
router.route("/getUser").get(userAuth, getUser);
router.route("/likedSong/:songId").patch(userAuth, updateLikedSongs);
router.route("/favouriteSongs").patch(userAuth, favouriteSongs);
router.route("/getAllSongs").get(getSongs);
router.route("/newplaylist").post(userAuth, newPlayList);
router.route("/deleteplaylist/:playlistId").delete(userAuth, deltePlaylist);
router.route("/editplaylist/:playlistId").patch(userAuth, editPlaylist);
router
  .route("/addSongToPlaylist/:playlistId")
  .patch(userAuth, addSongtoPlaylist);
router
  .route("/delteSongFromPlaylist/:playlistId")
  .patch(userAuth, removeSongfromPlaylist);
router.route("/getplaylist/:playlistId").get(userAuth, getPlaylist);
router.route("/getallplaylists").get(userAuth, getAllPlaylist);
router.route("/getAllArtists").get(getAllArtists);
router.route("/getCatogories").get(getAllCatogriesPlaylist);
router.route("/getDownloadUrl/:audioUrl").get(getDownloadSongURl);

module.exports = router;
