import React, { useEffect, useState } from 'react'
import { faClose, faMusic } from '@fortawesome/free-solid-svg-icons'
import { PlaylistAdd } from '@mui/icons-material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setSideBar } from '../../../Features/modalSlice'
import { useDispatch, useSelector } from 'react-redux'
import PlaylistCard from './PlaylistCard'
import { setUserPlaylists } from '../../../Features/UserPlaylistSlice'
import Loading from '../../SharedComponents/Loading'
import Error from '../../SharedComponents/Error'
import axios from 'axios'
import NewPlaylistCard from '../../Playlist/NewPlaylistCard'

const SideBar = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const { openSideBar } = useSelector(store => store.modal)
  const { userPlaylists } = useSelector(store => store.playlists)
  const { token } = useSelector(store => store.userDetails)
  const dispatch = useDispatch()



  useEffect(() => {
    if (!token) {
      return
    }
    const gettingPlaylists = async () => {
      try {
        const res = await axios.get(`${process.env.SERVER_URL}/getallplaylists`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        // setAllPlaylists(res.data.playlists)
        dispatch(setUserPlaylists(res.data.playlists))
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setError(true)
      }
    }

    gettingPlaylists()
  }, [refresh])


  const hideSideBar = () => {
    dispatch(setSideBar(false))
  }


  if (loading) {

    return <div className={`fixed overflow-scroll pb-40 top-0  z-20 right-0 h-screen bg-blue-400 md:w-[60vw]  w-[70vw] transition-all ease-in-out ${openSideBar ? "translate-x-0" : "translate-x-full"} duration-1000 `}>
      <div className='fixed top-3 right-3 md:right-8 text-xl  md:text-2xl'><FontAwesomeIcon icon={faClose} onClick={hideSideBar} className='cursor-pointer' /></div>

      <Loading />
    </div>
  }



  if (error) {
    return <div className={`fixed overflow-scroll pb-40 top-0 grid place-content-center z-20 right-0 h-screen bg-blue-400 md:w-[60vw]  w-[70vw] transition-all ease-in-out ${openSideBar ? "translate-x-0" : "translate-x-full"} duration-1000 `}>
      <div className='fixed top-3 right-3 md:right-8 text-xl  md:text-2xl'><FontAwesomeIcon icon={faClose} onClick={() => dispatch(setSideBar(false))} className='cursor-pointer' /></div>

      <Error error='Something went wrong' />
    </div>
  }


  return (
    <div className={`fixed overflow-scroll pb-40 top-0  z-20 right-0 h-screen bg-blue-400 md:w-[60vw]  w-[70vw] transition-all ease-in-out ${openSideBar ? "translate-x-0" : "translate-x-full"} duration-1000 `}>
      <div className='fixed top-3 right-3 md:right-8 text-xl  md:text-2xl hover:text-red-600'><FontAwesomeIcon icon={faClose} onClick={() => dispatch(setSideBar(false))} className='cursor-pointer' /></div>
      <div className='space-y-4  md:mt-5 mt-10 '>
        <div className='text-center'>
          <h1 className='md:text-3xl text-xl font-Comfortaa '>
            <FontAwesomeIcon icon={faMusic} className='text-red-800' /> Add To Playlist
          </h1>
        </div>

        <div className='m-5'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between text-sm gap-3'>
            {userPlaylists.map((playlist, index) => {
              return <PlaylistCard key={index} {...playlist} setRefresh={setRefresh} refresh={refresh} />
            })}
            <NewPlaylistCard fromModal="fromModal" />

          </div>

        </div>
      </div>
    </div>
  )
}

export default SideBar
