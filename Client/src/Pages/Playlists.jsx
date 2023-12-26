import React, { useEffect, useState } from 'react'
import NewPlaylistCard from '../Components/Playlist/NewPlaylistCard'
import PlaylistCard from '../Components/Playlist/PlaylistCard'
import Error from '../Components/SharedComponents/Error'
import Loading from '../Components/SharedComponents/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { setUserPlaylists } from '../Features/UserPlaylistSlice'
import { HeadsetRounded, DeleteForever, CancelOutlined, Cancel } from '@mui/icons-material'
import DeletePlaylistModal from '../Modals/DeletePlaylistModal'
import { setSessionExpiredModal } from '../Features/modalSlice'
import { getUserPlaylists } from '../api/user'



const Playlists = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [allPlaylists, setAllPlaylists] = useState([])
  const [allowDelete, setAllowDelete] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [deleteModal, setDeletModal] = useState(false)
  const [id, setId] = useState('')
  const { token } = useSelector(store => store.userDetails)

  const dispatch = useDispatch()




  useEffect(() => {
    const gettingPlaylists = async () => {
      try {
        setLoading(true)
        ///TODO :return all playlist later with
        const res = await getUserPlaylists(token)
        setAllPlaylists(res.data.playlists)
        dispatch(setUserPlaylists(res.data.playlists))
      } catch (err) {
        const { error } = err.response.data
        if (error === 'TokenExpiredError') {
          dispatch(setSessionExpiredModal(true))
          setLoading(false)
          return
        }
      } finally {
        setLoading(false)
      }
    }

    gettingPlaylists()
  }, [refresh])

  if (loading) {
    return <div className='min-h-screen'>
      <Loading />
    </div>

  }

  if (error) {
    return <div className='min-h-screen'>
      <Error error={'Sorry! something went wrong'} />

    </div>
  }




  return (

    <div className='min-h-screen pb-40'>
      {deleteModal && <DeletePlaylistModal {...{ setLoading, setRefresh, id, refresh, setDeletModal }} />}
      <div className='pt-5 pl-5 pr-3 mb-5 space-y-5'>
        <div className='flex justify-between items-center'>
          <h1 className='text-5xl  text-red-300'>Playlists</h1>
          <div className=' md:text-xl '>
            {allPlaylists.length !== 0 ? (allowDelete ? <span className='cursor-pointer  md:mr-10 text-green-300' onClick={() => setAllowDelete(false)}>Cancel <Cancel className='text-white ml-1' /></span> : <span className='cursor-pointer  md:mr-10 text-red-300' onClick={() => setAllowDelete(true)}>Delete <DeleteForever /></span>) : ''}

          </div>

        </div>
        {allPlaylists.length === 0 ?
          (<h2 className='text-lg text-zinc-400 font-thin'>You don't have any playlist yet </h2>) : (
            <h2 className='text-lg text-zinc-400 font-thin'>Here are the playlists created by you <HeadsetRounded /> </h2>)
        }
      </div>
      <div className='grid xs:grid-cols-2 sm:grid-cols-3 pr-2  lg:grid-cols-5'>
        <NewPlaylistCard />
        {(allPlaylists.map((playlist) => {
          return <PlaylistCard {...playlist} key={playlist._id} allowDelete={allowDelete} setId={setId} setDeletModal={setDeletModal} />
        }))}

      </div>




    </div>
  )
}

export default Playlists
