import React, { useEffect, useState } from 'react'
import { PauseSharp, PlayArrowSharp } from '@mui/icons-material'
import { useDispatch, useSelector } from "react-redux"
import { setIsplaying, setCurrentTrack, } from '../../Features/CurrentTrack'
import { setPlayList, setNotShuffled } from '../../Features/SongSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { Add } from '@mui/icons-material'
import { setLoginModal, setSideBar } from '../../Features/modalSlice'
import { setSongToBeAdded, updateUserPlaylist } from '../../Features/UserPlaylistSlice'
import { useLocation } from 'react-router-dom'
import axios from 'axios'





const SongCard = ({ name, url, albums, _id, artist, img, playlistId }) => {
  const { currentplaying, isPlaying } = useSelector(store => store.currentTrack)
  const [playing, setPlaying] = useState(false)
  const [options, setOptions] = useState(false)
  const dispatch = useDispatch()



  useEffect(() => {
    if (currentplaying?.name !== name) setPlaying(false)
  }, [currentplaying])

  useEffect(() => {
    if (currentplaying?.name === name) {
      setPlaying(isPlaying)
    }
  }, [currentplaying, isPlaying])

  const handlePlaying = () => {
    if (currentplaying?.name === name) {

      setPlaying(!playing)
      dispatch(setIsplaying(!playing))
      return
    }

    dispatch(setCurrentTrack({ url, name, _id, artist }))
    dispatch(setIsplaying(true))
    setPlaying(true)
    dispatch(setPlayList(albums))
    dispatch(setNotShuffled(albums))

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
            {options && <Options {...{ name, url, img, _id, artist, playlistId, setOptions }} />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SongCard




const Options = ({ url, _id, img, artist, name, playlistId, setOptions }) => {
  let { userDetails, token } = useSelector(store => store.userDetails)
  const [removeSong, setRemoveSong] = useState(false)

  const dispatch = useDispatch(setSideBar())
  const { pathname } = useLocation()
  const page = pathname.split('/')

  //putting remove song button to options
  useEffect(() => {
    if (page[1] === 'playlists') {
      setRemoveSong(true)
    }
  }, [page])

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
      const res = await axios.patch(`https://musica-8uoh.onrender.com/delteSongFromPlaylist/${playlistId}`, { songId: _id }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

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
        {removeSong && <div className='hover:text-red-500' onClick={removeSongHandler}>
          remove
        </div>}
        <div className='hover:text-red-500 ' onClick={addToPlaylistHandler}>
          <Add />
        </div>

      </div>

    </>
  )
}