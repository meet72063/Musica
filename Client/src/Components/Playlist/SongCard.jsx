import React, { useEffect, useState } from 'react'
import { AddCircleOutlineSharp, CheckCircleOutlineSharp } from '@mui/icons-material'
import {removeFromCreatePlaylist,addToCreatePlaylist} from "../../Features/SongSlice"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


 






const SongCard = ({ name, url, albums, img, artist ,_id}) => {
   
    const [selected, setSelected] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSelected = ()=>{
       
        setSelected(!selected)
        if(selected){
             dispatch(removeFromCreatePlaylist({name,url,img,_id,artist}))
    
    }
    else{
        
        dispatch(addToCreatePlaylist({name,url,img,_id,artist}))
    }
    }

   
    
   


    return (
        <div>
            <div className='bg-red-300 h-14 grid items-center rounded-md  '>
                <div className='flex items-center pl-5 pr-5 justify-between xs:text-sm '>
                        <img src={`${img || "./musicwheel.png"}`} alt="" className=' h-10 w-10 rounded-full' />
                               
                            <span className="mt-2 text-black" >{name}</span>
                            <span className="mt-2 text-zinc-700 " >{artist}</span>
                        

                    
                    <div className=''>
                        <button onClick={handleSelected} className={` ${selected ? "text-green-600" : "text-red-500"}`}>
                            {selected ? <CheckCircleOutlineSharp /> : <AddCircleOutlineSharp />}

                        </button>
                    </div>
                    
                </div>

            </div>
        </div>
    )
}

export default SongCard