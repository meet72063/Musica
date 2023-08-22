import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const userplaylistSlice = createSlice({
  name: "playlists",
  initialState: {
    userPlaylists: [],
    songTobeAdded: "",
  },
  reducers: {
    setUserPlaylists: (state, { payload }) => {
      state.userPlaylists = payload;
    },
    setSongToBeAdded: (state, { payload }) => {
      state.songTobeAdded = payload;
    },
    updateUserPlaylist:(state,{payload})=>{
      const filteredplaylist = state.userPlaylists.filter((playlist)=>playlist._id!==payload._id)
      filteredplaylist.unshift(payload)
      state.userPlaylists = filteredplaylist
    }
  },
});

export const {
  setUserPlaylists,
  setSongToBeAdded,
  updateUserPlaylist
} = userplaylistSlice.actions;
export default userplaylistSlice.reducer;
