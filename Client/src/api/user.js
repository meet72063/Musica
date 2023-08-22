import axios from "axios";
const baseUrl = "http://localhost:5000";

export const getAllSongs = async () => {
  const res = await axios.get(`${baseUrl}/getAllSongs`);
  return res.data;
};

export const getAllArtists = async () => {
  const res = await axios.get(`${baseUrl}/getAllArtists`);
  return res.data.artists;
};

// getting all the catogories playlists

export const getCatogories = async () => {
  const res = await axios.get(`${baseUrl}/getCatogories`);
  return res.data.catogories;
};
