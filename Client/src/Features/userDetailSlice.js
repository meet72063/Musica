import {createSlice}  from '@reduxjs/toolkit'

const initialState = {
    userDetails:{},
    token:""
}


const userDetailsSlice = createSlice({
    name:'userDetails',
    initialState,
    reducers:{
     storeUserDetails:(state,{payload})=>{
        state.userDetails = payload
     },
     setToken:(state,{payload}) =>{
        state.token = payload
    },
    removeFromFavouritePlaylist: (state, { payload }) => {
        state.userDetails.likedSongs = state.userDetails.likedSongs.filter(
          (item) => item._id !== payload._id
        );
      },
      addToFavouritePlaylist: (state, { payload }) => {
        state.userDetails.likedSongs.push(payload);
      },
    },
   
    
})




export default userDetailsSlice.reducer
export const {storeUserDetails,setToken,addToFavouritePlaylist,removeFromFavouritePlaylist} = userDetailsSlice.actions
