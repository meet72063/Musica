import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SongCard from '../ArtistPlaylist/SongCard'
import { setNotShuffled, setPlayList, setShuffle } from '../../Features/SongSlice'
import { setIsplaying, setCurrentTrack } from '../../Features/CurrentTrack'



const Library = () => {
  const { Library } = useSelector(store => store.currentTrack)
  let freshSongs = [...Library].splice(0, Library.length / 2)

  const dispatch = useDispatch()

  const handleFreshSongsPlaylist = () => {
    dispatch(setCurrentTrack(freshSongs[0]))
    dispatch(setIsplaying(true))
    dispatch(setPlayList(freshSongs))
    dispatch(setShuffle(false))
  }





  return (
    <div>
      <div className='space-y-3 mt-16 '>
        <div className='flex space-x-10 mb-5'>
          <h1 className='text-3xl text-white font-thin  font-gorilla'>Fresh Playlist</h1>
          <button className='p-2 border-2 border-black rounded-lg text-white' onClick={handleFreshSongsPlaylist}>Play All</button>
        </div>
        <div className='grid gap-2 sm:ml-10'>

          {freshSongs.map((track, index) => {
            return <SongCard key={index} {...track} albums={freshSongs} />
          })}
        </div>
      </div>

      <MixedPlaylist />


    </div>
  )
}

export default Library


export const MixedPlaylist = () => {
  const { Library } = useSelector(store => store.currentTrack)
  const dispatch = useDispatch()
  let mixedSongs = [...Library].splice(Library.length / 2)

  const handleMixSongsPlaylist = () => {
    dispatch(setCurrentTrack(mixedSongs[0]))
    dispatch(setIsplaying(true))
    dispatch(setPlayList(mixedSongs))
    dispatch(setNotShuffled(mixedSongs))
    dispatch(setShuffle(false))
  }
  return (
    <div className='space-y-3 mt-16 '>
      <div className='flex space-x-10 mb-5'>
        <h1 className='text-3xl text-white font-thin  font-gorilla'>Mix Playlist</h1>
        <button className='p-2 pr-4 pl-4 border-2 border-black rounded-lg text-white' onClick={handleMixSongsPlaylist}>Play All</button>
      </div>
      <div className='grid gap-2 sm:ml-10'>

        {mixedSongs.map((track, index) => {
          return <SongCard key={index} {...track} albums={mixedSongs} />
        })}
      </div>
    </div>
  )
}