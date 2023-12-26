import React, { useEffect, useState } from 'react'
import SongsHorizontalList from './SongsHorizontalList'
import ArtistsIconsList from './ArtistsIconsList'
import Cartogories from './Catagories/Cartogories'
import Searchbar from './SearchBar/Searchbar'
import { Playlist } from '../AllSongs/Library'
import { useSelector } from 'react-redux'





const MainContent = () => {
  const { Library } = useSelector(state => state.currentTrack)
  const mixedPlaylist = Library.slice(0, Math.floor(Library.length / 2))

  return (
    <div className='bg-transparent flex gap-3   pr-3 pb-32 mt-5'>
      <div className=' bg-transparent-800 w-[100%] pt-3 outline-none  p-5 space-y-20'>
        <Searchbar />
        <SongsHorizontalList homepage={true} />
        <ArtistsIconsList />
        <Cartogories />
        <Playlist name={"Mixed Playlist"} playlist={mixedPlaylist} />

      </div>
    </div>
  )
}

export default MainContent
