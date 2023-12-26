import axios from "axios";
const baseUrl = "https://musica-8uoh.onrender.com";

//public methods request
export const getAllSongs = async (signal) => {
  const res = await axios.get(`${baseUrl}/getAllSongs`, { signal });
  return res.data;
};

export const getAllArtists = async (signal) => {
  const res = await axios.get(`${baseUrl}/getAllArtists`, { signal });
  return res.data.artists;
};

// getting all the catogories playlists

export const getCatogories = async (signal) => {
  const res = await axios.get(`${baseUrl}/getCatogories`, { signal });
  return res.data.catogories;
};

//authenitcated user requests

//remove song from playlist

export const removeSongFromPlaylist = async (token, playlistId, songId) => {
  return await axios.patch(
    `${baseUrl}/delteSongFromPlaylist/${playlistId}`,
    { songId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

//get user's playlists
export const getUserPlaylists = async (token) => {
  return await axios.get(`${baseUrl}/getallplaylists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//add songs to user's playlist
export const addSongsToPlaylist = async (playlistId, song, token) => {
  return await axios.patch(`${baseUrl}/addSongToPlaylist/${playlistId}`, song, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//get user playlist

export const getUsrPlaylist = async (token) => {
  return await axios.get(`${baseUrl}/getallplaylists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
