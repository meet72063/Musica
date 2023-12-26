import { createSlice } from "@reduxjs/toolkit";

// Initial state constant for reusability
const initialState = {
  currentplaying: null,
  isPlaying: false,
  allSongs: [],
  allArtist: [],
  songs: [],
  catogories: [],
  Library: [],
};

// Creating the Redux slice
const currentTrack = createSlice({
  name: "CurrentTrack",
  initialState,
  reducers: {
    // Payload to play a song
    setCurrentTrack: (state, { payload }) => {
      // Set the current playing song and start playing
      state.currentplaying = payload;
      state.isPlaying = true;
    },

    // Play/pause song
    setIsplaying: (state, { payload }) => {
      // Set the play/pause state
      state.isPlaying = payload;
    },

    // Set all songs
    setAllSongs: (state, { payload }) => {
      // Store fetched all songs
      state.allSongs = payload;
      // Store songs in the library
      state.Library = [...state.Library, ...payload];
    },

    // Set song loading state
    setSongLoading: (state, { payload }) => {
      // Set the loading state for songs
      state.songsLoading = payload;
    },

    // Set all artists
    setAllArtists: (state, { payload }) => {
      // Store fetched all artists
      state.allArtist = payload;

      // Store artists' albums in the library
      let library = [...state.Library];
      payload.forEach((artist) => {
        library = [...library, ...artist.albums];
      });
      // Update the library
      state.Library = library;
    },

    // Set artist songs
    setartistSongs: (state, { payload }) => {
      // Add artist songs to the songs array
      state.songs.push(payload);
    },

    // Set categories
    setCatogories: (state, { payload }) => {
      // Store fetched categories
      state.catogories = payload;

      // Update library with songs from each category
      let library = [...state.Library];
      payload.forEach((category) => {
        library = [...library, ...category.songs];
      });
      state.Library = library;
    },
  },
});

// Export actions and reducer
export const {
  setCurrentTrack,
  setIsplaying,
  setAllSongs,
  setAllArtists,
  setartistSongs,
  setCatogories,
} = currentTrack.actions;
export default currentTrack.reducer;
