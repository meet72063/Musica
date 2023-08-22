import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DeleteForever } from '@mui/icons-material'
import axios from 'axios'
import { useSelector } from 'react-redux'


const PlaylistCard = ({ name, _id, description, songs, allowDelete, setDeletModal, setId }) => {

  const navigate = useNavigate()


  const handleDelete = (e) => {
    e.stopPropagation()
    setId(_id)
    setDeletModal(true)
  }




  return (
    <div className='flex mb-16 pt-5 pl-5 ' >
      <div className='bg-zinc-900  border-black border-[0.3px]  w-[200px] h-[270px] relative  rounded-md p-2 cursor-pointer' onClick={() => navigate(`/playlists/${_id}`)}>
        <img src='/music13.jpg' alt="playlist_cover" className='h-[70%] rounded-md w-[100%] ' />
        <h2 className='mt-3 sm:text-xl capitalize text-red-300 font-thin'>{name}</h2>
        <span className='overflow-hidden mt-3 text-slate-500'>{`${songs.length} Songs`}</span>
        {allowDelete && <span className="text-white absolute right-2" ><DeleteForever onClick={handleDelete} /></span>}

      </div>
    </div>

  )
}

export default PlaylistCard
