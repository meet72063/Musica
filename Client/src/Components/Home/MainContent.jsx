import React, { useEffect } from 'react'
import SongsHorizontalList from './SongsHorizontalList'
import ArtistsIconsList from './ArtistsIconsList'
import Cartogories from './Catagories/Cartogories'
import Searchbar from './SearchBar/Searchbar'
import { MixedPlaylist } from '../AllSongs/Library'
import { GetAllSongs, setError, setSongLoading } from '../../Features/CurrentTrack'
import { getAllSongs } from '../../api/user'
import { useDispatch } from 'react-redux'




const MainContent = () => {
  const dispatch = useDispatch()
  useEffect(() => {

    const gettingsongs = async () => {
      try {
        dispatch(setSongLoading(true))
        const { songs } = await getAllSongs()
        dispatch(GetAllSongs(songs))
        dispatch(setSongLoading(false))
        dispatch(setError(false))
      } catch (error) {
        console.log(error)
        dispatch(setSongLoading(false))
        dispatch(setError(true))
      }

    }
    gettingsongs()
  }, [])
  return (
    <div className='bg-transparent flex gap-3   pr-3 pb-32 mt-5'>
      <div className=' bg-transparent-800 w-[100%] pt-3 outline-none  p-5 space-y-20'>
        <Searchbar />
        <SongsHorizontalList homepage={true} />
        <ArtistsIconsList />
        <Cartogories />
        <MixedPlaylist />

      </div>
    </div>
  )
}

export default MainContent
