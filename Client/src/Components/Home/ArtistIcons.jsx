import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'





const ArtistIcons = ({img,name,_id}) => {
  const navigate = useNavigate()
  return (
    <div className='space-y-1 text-red-400  text-lg font-semibold flex flex-col items-center '>
           <img src={img} className='w-[150px] h-[150px] cursor-pointer rounded-[100px] border-[0.1px] border-zinc-400'  onClick={()=>navigate(`/artist/${_id}`)}  alt='img'/>
           <span className=' font-bold font-cursive xs:text-lg sm:text-2xl tracking-wide text-green-300 cursor-pointer  ' onClick={()=>navigate(`/artist/${_id}`)}>{name}</span>
    </div>

  )
}




export default ArtistIcons




