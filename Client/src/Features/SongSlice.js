import { createSlice } from "@reduxjs/toolkit";

export const ShufflePlaylist = (arr)=>{
  for(let i=arr.length-1;i>=0;i--){
    let  j = Math.floor(Math.random()*(i+1))
   let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  return arr
}


 const songSlice = createSlice({
    name:'songs',
    initialState:{
      playlist:[],
      createPlaylist:[],
      shuffle:false,
      notShuffledTracks:[]

     
    },
    reducers:{
      setPlayList:(state,{payload})=>{
        state.playlist = payload
      },
     addToCreatePlaylist:(state,{payload})=>{
        state.createPlaylist.push(payload)
     },
     removeFromCreatePlaylist:(state,{payload})=>{
      state.createPlaylist = state.createPlaylist.filter((song)=>song.url!==payload.url)
     },
     clearCreatePlaylist:(state)=>{
      state.createPlaylist=[]
     },
     shuffleSongs :(state)=>{
      const songs = ShufflePlaylist(state.playlist)
     state.playlist = songs
    },
    setShuffle:(state,{payload})=>{
      state.shuffle = payload
    },
    setNotShuffled:(state,{payload})=>{
      state.notShuffledTracks = payload
    }
    
    }
    
})



export default songSlice.reducer

export const {setPlayList,addToCreatePlaylist,removeFromCreatePlaylist,clearCreatePlaylist,shuffleSongs,setShuffle,setNotShuffled} = songSlice.actions
