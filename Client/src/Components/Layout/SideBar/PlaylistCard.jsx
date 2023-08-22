import React, { useEffect, useState } from 'react'
import { CheckBox, RadioButtonUnchecked, RadioButtonChecked, LibraryAddCheck, LibraryAddOutlined } from '@mui/icons-material'
import { useSelector } from 'react-redux'

import axios from 'axios'


const PlaylistCard = ({ name, _id, songs, refresh, setRefresh }) => {
    const { openSideBar } = useSelector(store => store.modal)
    const { songTobeAdded } = useSelector(store => store.playlists)
    const { token } = useSelector(store => store.userDetails)
    const [checkBox, SetCheckBox] = useState(true)
    const [showConformationModal, setShowConfromationModal] = useState(false)



    useEffect(() => {

        if (openSideBar) {
            SetCheckBox(false)
        }
        else {
            setShowConfromationModal(false)
        }
    }, [openSideBar])

    const addSongHandler = () => {
        const matchedSongArray = songs.filter((song) => song._id === songTobeAdded._id)
        if (matchedSongArray.length === 0) {
            SetCheckBox(true)
            setRefresh(!refresh)

            //adding song to playlist on database
            const addSongToPlaylist = async () => {
                try {
                    const res = await axios.patch(`https://musica-8uoh.onrender.com/addSongToPlaylist/${_id}`, songTobeAdded, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                } catch (error) {
                    console.log(error)
                }
            }
            addSongToPlaylist()

        }
        else {
            setShowConfromationModal(true)
        }
    }





    return (
        <div className='h-44 space-y-2 w-52 bg-transparent flex flex-col items-center justify-center relative'>
            {showConformationModal && <ConformationModel {...{ setShowConfromationModal, name }} />}
            <img src="/music13.jpg" alt="" className='h-28 w-28  rounded-md' onClick={addSongHandler} />

            <div className='flex items-center text-base'>

                <h1 className='m-2'>{name}</h1>
                <button >{checkBox ? <LibraryAddCheck /> : <LibraryAddOutlined onClick={addSongHandler} />}</button>
            </div>


        </div>
    )
}

export default PlaylistCard


const ConformationModel = ({ setShowConfromationModal, name }) => {
    return (
        <div className='absolute top-0 w-[70%] z-10 bg-[rgba(255,255,255)] font-gorilla font-thin text-black border-black border-[0.1px] h-[96%] rounded-md  p-1'>
            <h2 className='text-base'>Song Already present in the playlist</h2>
            <div className='absolute bottom-2 right-2 space-x-2 font-semibold'>
                {/* <button  className=' rounded-md' >Add</button> */}
                <button className='p-1 px-4 bg-red-300  rounded-md' onClick={() => setShowConfromationModal(false)}>OK</button>
            </div>

        </div>
    )
}