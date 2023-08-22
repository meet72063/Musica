import { createSlice } from "@reduxjs/toolkit";



 const artistSlice = createSlice({
    name:'artists',
    initialState:{
  
    },
    reducers:{
      GetArtists:(state,{payload})=>{
         
        
     
      }
    }
    
})

export default artistSlice.reducer
export const {GetArtists} = artistSlice.actions


