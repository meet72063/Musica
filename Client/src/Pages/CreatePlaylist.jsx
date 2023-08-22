import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import SongCard from '../Components/Playlist/SongCard'
import { useDispatch, useSelector } from 'react-redux'
import { clearCreatePlaylist } from '../Features/SongSlice'
import { useNavigate } from 'react-router-dom'
import Loading from '../Components/SharedComponents/Loading'
import axios from 'axios'

const CreatePlaylist = () => {
  const { allSongs, Library } = useSelector(store => store.currentTrack)
  const { createPlaylist } = useSelector(store => store.songs)
  const { userDetails: { likedSongs }, token } = useSelector(store => store.userDetails)
  const [playlistInfo, setPlaylistInfo] = useState({ name: '', description: '' })
  const [loading, setLoading] = useState(false)
  const [Alert, setAlert] = useState('')


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearCreatePlaylist())
  }, [])

  const navigate = useNavigate()
  const handleInput = (e) => {
    if (e.target.name === 'name') {
      setAlert('')
    }
    setPlaylistInfo({ ...playlistInfo, [e.target.name]: e.target.value })
  }

  const submitPlaylist = async () => {
    if (!playlistInfo.name) {
      setAlert('please provide name of the playlist')
      return
    }
    if (createPlaylist.length === 0) {
      alert('Playlist can not be empty')
      return
    }

    let data = { name: playlistInfo.name, description: playlistInfo.description, songs: createPlaylist }
    try {
      setLoading(true)
      const res = await axios.post(`${process.env.SERVER_URL}/newplaylist`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      navigate('/playlists')
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  if (loading) {
    return <div className='min-h-screen'>
      <Loading />
    </div>

  }

  return (
    <div className=' min-h-screen pb-40 text-white max-w-[100%]  '>
      <div className='flex border-b-[0.1px] pb-5 border-zinc-600 pt-4 ml-8 justify-between '>
        <h1 className=' text-red-300 xs:text-2xl md:text-3xl  font-semibold'>Create a playlist</h1>
        <button className='  xs:p-2 sm:p-3 rounded-md bg-red-500 mr-5' onClick={submitPlaylist} >Create</button>

      </div>

      <div className='flex mt-8 pl-10 space-x-4 sm:space-x-8 '>
        <div className='flex flex-col'>
          <label htmlFor="playlistName" className='font-thin  sm:text-xl text-zinc-300'>Playlist Name</label>
          <TextField id="playlistName" name='name' variant="standard" sx={{ input: { color: 'white', width: "40vw" } }} autoComplete='off' InputLabelProps={{
            shrink: true,
          }} onChange={handleInput} />
        </div>
        <div className='flex flex-col '>
          <label htmlFor="playlistDiscription" className='font-thin sm:text-xl text-zinc-300'>Playlist Discription</label>
          <TextField id="playlistDiscription" name='description' variant="standard" sx={{ input: { color: 'white', width: "40vw" } }} autoComplete='off' onChange={handleInput} className='flex flex-wrap' />
        </div>
      </div>

      <h1 className='text-red-500 ml-7 mt-2 bg-transparent  '> {Alert}</h1>
      <div className='ml-10 mt-10 space-y-2 mr-10 border-zinc-800'>

        <h1 className=' text-red-300 text-3xl font-semibold  '>Add Songs</h1>
        <div>
          <h2 className='font-thin  text-zinc-300'>from library</h2>
          <div className='mt-10 grid lg:grid-cols-3  md:grid-cols-2 gap-4 '>
            {Library?.map((song, index) => {
              return <SongCard key={index} {...song} />
            })}

          </div>
        </div>

      </div>

      <div className='mt-10 grid grid-cols-3 gap-x-10 gap-y-1 ml-8'>

      </div>

      {likedSongs.length > 0 && <div className='ml-10 mr-10 mt-8 pb-2 border-b-[0.1px] border-zinc-800'>
        <h2 className='font-thin  text-zinc-300'>from your favourites</h2>
      </div>}
      <div className='mt-10 grid lg:grid-cols-3  md:grid-cols-2 gap-4 ml-8 mr-10'>
        {likedSongs.map((song, index) => {
          return <SongCard key={index} {...song} />
        })}

      </div>

    </div>
  )
}

export default CreatePlaylist
