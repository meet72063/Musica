import { createSlice } from "@reduxjs/toolkit";

export const ShufflePlaylist = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

const songSlice = createSlice({
  name: "songs",
  initialState: {
    //to hold unshuffled playlist
    cachePlaylist: [],
    playlist: [],
    createPlaylist: [],
    shuffle: false,
  },
  reducers: {
    setPlayList: (state, { payload }) => {
      //store unShuffled Version of playlist
      state.cachePlaylist = payload;
      //if shuffle is on Shuffle playlist before queuing playlist
      if (state.shuffle) {
        state.playlist = ShufflePlaylist(payload);
      } else {
        state.playlist = payload;
      }
    },
    addToCreatePlaylist: (state, { payload }) => {
      state.createPlaylist.push(payload);
    },
    removeFromCreatePlaylist: (state, { payload }) => {
      state.createPlaylist = state.createPlaylist.filter(
        (song) => song.url !== payload.url
      );
    },
    clearCreatePlaylist: (state) => {
      state.createPlaylist = [];
    },
    shuffleSongs: (state) => {
      const songs = ShufflePlaylist(state.playlist);
      state.playlist = songs;
    },
    setShuffle: (state) => {
      // Read the current state value
      const currentShuffleState = state.shuffle;

      // If shuffled is on, shuffle off and set cached unshuffled version
      // else shuffle the playlist and set shuffle true
      if (currentShuffleState) {
        state.playlist = [...state.cachePlaylist];
      } else {
        state.playlist = ShufflePlaylist([...state.cachePlaylist]);
      }

      // toggle shuffle state
      state.shuffle = !currentShuffleState;
    },
  },
});

export default songSlice.reducer;

export const {
  setPlayList,
  addToCreatePlaylist,
  removeFromCreatePlaylist,
  clearCreatePlaylist,
  shuffleSongs,
  setShuffle,
} = songSlice.actions;
