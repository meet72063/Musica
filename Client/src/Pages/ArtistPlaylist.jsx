import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SongCardList from '../Components/ArtistPlaylist/SongCardList'
import { setCurrentTrack, setIsplaying } from '../Features/CurrentTrack'
import { setPlayList } from '../Features/SongSlice'


const Artist = () => {
  const { id } = useParams()
  const { allArtist } = useSelector((store) => store.currentTrack)
  const [artist] = allArtist?.filter((artist) => artist._id === id)
  const dispatch = useDispatch()

  const playAllHanlder = () => {
    dispatch(setCurrentTrack({ ...artist.albums[0] }))
    dispatch(setIsplaying(true))
    dispatch(setPlayList(artist.albums))
  }

  return (
    <div className='bg-black flex gap-3  pb-1  pl-3 pr-3 min-h-screen '>
      <div className=' bg-zinc-800 w-[100%]  text-white '>
        <div className=' pr-1 grid sm:grid-cols-[160px_1fr]  '>
          <div className=' bg-zinc-900 border-gray-700 border-r-[0.5px]'>

          </div>
          <div className=' mt-4 ml-2 '>
            <div className='flex space-y-1'>
              <img src={artist.img} alt="artist img" className='w-[210px] h-[210px] rounded-lg pl-1 mt-4 ' />
              <div className=' ml-2  pr-10 xs:pr-0'>
                <h1 className='xs:text-3xl ms:text-5xl  text-red-500 mb-2 '> {artist.name}</h1>

                <span className='xs:text-sm ' >{artist.description}</span>

              </div>

            </div>
            <div className='mt-10 flex gap-x-12 border-b-gray-700 border-b-[0.3px] pb-5 mr-10' >
              <h1 className=' xs:text-2xl text-3xl'>{artist.albums.length} Songs</h1>
              <button className='border-white border-2 w-32 h-10 rounded-lg' onClick={playAllHanlder}>play All</button>
            </div>

            <SongCardList {...artist} />


          </div>
        </div>

      </div>
    </div>
  )
}

export default Artist
