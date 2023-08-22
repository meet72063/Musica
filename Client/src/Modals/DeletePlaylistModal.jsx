import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'



const DeletePlaylistModal = ({ setLoading, refresh, setRefresh, setDeletModal, id }) => {
  const { token } = useSelector(store => store.userDetails)
  const handleDeletePlaylist = async () => {

    try {

      setDeletModal(false)
      setLoading(true)
      const response = await axios.delete(`${process.env.SERVER_URL}/deleteplaylist/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      setLoading(false)
      setRefresh(!refresh)

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  return (
    <div className=' w-[100%] grid place-content-center fixed top-0 z-20 h-screen  bg-[rgba(0,0,0,0.8)] shadow-lg'  >
      <div className=' bg-slate-100 border-[0.3px] border-slate-400 sm:h-52 xs:w-72 ms:w-72 p-1 ms:h-32  md:w-96   text-black relative  rounded-md ' onClick={(e) => e.stopPropagation()}>
        <button className=' text-xl font-semibold hover:text-[23px] absolute right-4' onClick={() => setDeletModal(false)}>x</button>
        <div className=' p-2  md:absolute top-8 left-5'>
          <div className='space-y-3'>
            <h1 className='text-2xl font-bold xs:pt-3'>Are You Sure to Delete ?</h1>
            <h2 className='xs:text-base  pb-5 sm:text-xl  '>You cannot restore the playlist after deletion  </h2>
          </div>
        </div>
        <div className='space-x-3  xs:absolute right-2  bottom-2'>
          <button className='bg-white w-24 h-8 rounded-lg border-[0.1px] border-slate-400 font-bold hover:bg-slate-200 active:bg-slate-300 ' onClick={() => setDeletModal(false)}  >Cancel</button>
          <button className='bg-[rgba(200,0,0,0.7)] w-24 text-white font-semibld h-8 rounded-lg hover:bg-[rgba(200,0,0,0.6)]' onClick={handleDeletePlaylist} >Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeletePlaylistModal 
