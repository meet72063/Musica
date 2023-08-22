import axios from "axios";

const baseUrl = process.env.SERVER_URL;

export const saveSong = async (data, token) => {
  const res = await axios.post(`${baseUrl}/songs/addSong`, data, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const saveArtistPlaylist = async (data, token) => {
  const res = await axios.post(`${baseUrl}/artist`, data, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const addingSongs = async (data, _id, token) => {
  console.log(data);
  const res = await axios.patch(`${baseUrl}/addingSongs/${_id}`, data, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
