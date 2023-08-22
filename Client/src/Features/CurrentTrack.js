import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentplaying:null,
    isPlaying:false,
    isLoading:true,
    allSongs:[],
    error:false,
    songsLoading:true,
    allArtist:[],
    ArtistFetchError:false,
    artistLoading:true,
    songs:[],
    currentArtist:'',
    catogories:[],
    Library:[]
}



 const currentTrack = createSlice({
    name:'CurrentTrack',
    initialState,
    reducers:{
      //payload to play song
       setCurrentTrack:(state,{payload})=>{
          state.currentplaying = payload
       },

       //play/pause song
       setIsplaying:(state,{payload})=>{
         state.isPlaying=payload
       },
      setIsLoading:(state,{payload})=>{
        state.isLoading = payload
      },
      GetAllSongs:(state,{payload})=>{
        state.allSongs=payload
      },
      setError:(state,{payload})=>{
        state.error=payload
      },
      setSongLoading:(state,{payload})=>{
        state.songsLoading=payload
      },
      GetAllArtists:(state,{payload})=>{
        state.allArtist=payload
      },
      setArtistFechError:(state,{payload})=>{
        state.ArtistFetchError=payload
      },
      setArtistLoading:(state,{payload})=>{
        state.artistLoading=payload
      },
      setartistSongs:(state,{payload})=>{
        state.songs.push(payload)
      },
      setcurrentArtist:(state,{payload})=>{
        state.currentArtist = payload
      },
      setCatogories:(state,{payload})=>{
        state.catogories = payload
      },
      setLibrary:(state,{payload})=>{
        state.Library = payload
      }
     
    }
    
})

export const {setCurrentTrack,
  setIsplaying,
  setIsLoading,
  GetAllSongs,
  setError,
  setSongLoading,
  GetAllArtists,
  setArtistFechError,
  setArtistLoading,
  setartistSongs,
  setcurrentArtist,
  setCatogories,
  setLibrary
    }  = currentTrack.actions
export default currentTrack.reducer


