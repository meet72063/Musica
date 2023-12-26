import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SongCard from '../ArtistPlaylist/SongCard'
import { setPlayList } from '../../Features/SongSlice'
import { setCurrentTrack } from '../../Features/CurrentTrack'


export const Playlist = ({ name, playlist }) => {
  const dispatch = useDispatch()


  const handlePlayAll = () => {
    dispatch(setCurrentTrack(playlist[0]))
    dispatch(setPlayList(playlist))
  }
  return (
    <div className='space-y-3 mt-16 '>
      <div className='flex space-x-10 mb-5'>
        <h1 className='text-3xl text-white font-thin  font-gorilla'>{name}</h1>
        <button className='p-2 pr-4 pl-4 border-2 border-black rounded-lg text-white' onClick={handlePlayAll}>Play All</button>
      </div>
      <div className='grid gap-2 sm:ml-10'>

        {playlist.map((track) => {
          return <SongCard key={track._id} {...track} albums={playlist} />
        })}
      </div>
    </div>
  )
}

const Library = () => {
  const { Library } = useSelector(store => store.currentTrack)
  const freshSongs = Library.slice(Math.floor(Library.length / 2))
  const mixedPlaylist = Library.slice(0, Math.floor(Library.length / 2))

  return (
    <div>
      <Playlist name={"Fresh Playlist"} playlist={freshSongs} />
      <Playlist name={"Mixed Playlist"} playlist={mixedPlaylist} />
    </div>
  )
}

export default Library


