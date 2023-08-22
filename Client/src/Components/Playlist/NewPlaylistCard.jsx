//Reusable component 
import React from 'react'
import { Add } from '@mui/icons-material'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSideBar } from '../../Features/modalSlice'

const NewPlaylistCard = ({fromModal}) => {
    
    // const {openSideBar} = useSelector(store=>store.modal)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const navigation = ()=>{
        if(fromModal){
            dispatch(setSideBar(false))
        }
       navigate('/createPlaylist')
    }
    return (
        <div className='flex mb-16 pt-5 pl-5 ' >
            <div className={`bg-zinc-900  border-black border-[0.3px] ${fromModal?"w-[160px] h-[170px]": "w-[200px] h-[270px]"} rounded-md p-2 cursor-pointer flex flex-col justify-center items-center`}>
                <div className='   bg-zinc-800  grid place-content-center  p-3 rounded-md'>
                    <button className='  inline-block text-white font-bold' onClick={navigation}>
                        <span className=''><Add /></span>
                    </button>
                </div>
                <h2 className='  text-white font-thin  sm:text-lg ml-8 mt-2'>Create a playlist</h2>


            </div>
        </div>
    )
}

export default NewPlaylistCard
