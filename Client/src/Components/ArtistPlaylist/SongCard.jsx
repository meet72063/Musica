import React, { useEffect, useState } from 'react'
import { PauseSharp, PlayArrowSharp } from '@mui/icons-material'
import { useDispatch, useSelector } from "react-redux"
import { setIsplaying, setCurrentTrack, } from '../../Features/CurrentTrack'
import { setPlayList } from '../../Features/SongSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { Add } from '@mui/icons-material'
import { setLoginModal, setSideBar } from '../../Features/modalSlice'
import { setSongToBeAdded, updateUserPlaylist } from '../../Features/UserPlaylistSlice'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { removeSongFromPlaylist } from '../../api/user'





const SongCard = (props) => {

  const [playing, setPlaying] = useState(false)
  const [options, setOptions] = useState(false)
  const { currentplaying, isPlaying } = useSelector(store => store.currentTrack)
  const { name, url, albums, _id, artist, img, playlistId } = props
  const dispatch = useDispatch()



  //show playing status if current playing is this song
  useEffect(() => {
    if (currentplaying?.name === name) setPlaying(isPlaying)
  }, [currentplaying, isPlaying])

  //play/pause song
  const handlePlaying = () => {
    //if it is currently playing song pause/resume the song
    if (currentplaying._id === _id) {
      dispatch(setIsplaying(!playing));
    } else {
      //set song to play
      dispatch(setCurrentTrack({ url, name, _id, artist }))
      dispatch(setPlayList(albums))
    }


  }

  return (
    <div>
      <div className='bg-red-300 h-14  sm:w-[80%] sm:mr-8 rounded-md pl-5 pr-2 group ralative gap-3 flex justify-between' onMouseLeave={() => setOptions(false)}>


        <div className=' flex gap-5  md:gap-10 items-center'>
          <img src={img || "/musicwheel.png"} alt="Cover" className=' h-10 w-10  pt-1 rounded-lg pr-1' />

          <h1 className=' xs:text-sm xs:text-black   sm:text-2xl font-extralight mr-2 text-black'>{name}</h1>
          <h1 className='  text-rose-900 font-thin tracking-wider xs:text-sm sm:text-lg'>{artist}</h1>
        </div>
        <div className='pr-4 flex gap-2 sm:gap-5 '>
          <button onClick={handlePlaying}>{playing ? <PauseSharp /> : <PlayArrowSharp />}</button>
          <button className='text-black invisible group-hover:visible relative  ' >
            <FontAwesomeIcon icon={faEllipsisVertical} onClick={() => setOptions(!options)} />
            {options && <Options {...props} setOptions={setOptions} />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SongCard


//modal to show

const Options = ({ url, _id, img, artist, name, playlistId, setOptions }) => {
  const { token } = useSelector(store => store.userDetails)

  const dispatch = useDispatch()
  const { pathname } = useLocation()
  //currnt page url
  const page = pathname.split('/')
  const isPlaylistPage = page[1] === 'playlists'

  const addToPlaylistHandler = () => {

    if (!token) {
      dispatch(setLoginModal(true))
      return
    }
    dispatch(setSideBar(true))
    dispatch(setSongToBeAdded({ url, _id, img, artist, name }))
  }

  //removing song from playlist
  const removeSongHandler = async () => {
    try {
      const res = await removeSongFromPlaylist(token, playlistId, _id)
      dispatch(updateUserPlaylist(res.data.playlist))
      setOptions(false)
    } catch (error) {
      alert(`An error occured while deleting ${name}`)
      console.log(error)
    }
  }

  return (
    <>
      <div className=' p-2 space-y-1 absolute right-0 rounded-md z-10 bg-white text-blue-400 flex flex-col '>
        <div className=' hover:text-red-500  '>
          <a href={url} download>DownLoad </a>
        </div>
        {/* show remove from playlist btn  only if it is playlist page*/}
        {isPlaylistPage && <div className='hover:text-red-500' onClick={removeSongHandler}>
          remove
        </div>}

        {/* add to playlist btn */}
        <div className='hover:text-red-500 ' onClick={addToPlaylistHandler}>
          <Add />
        </div>
      </div>

    </>
  )
}