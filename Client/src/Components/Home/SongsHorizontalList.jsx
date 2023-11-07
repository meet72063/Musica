import React, { useEffect, useState } from 'react'
import SongCard from './SongCard'
import { useDispatch, useSelector } from 'react-redux'

import Error from '../SharedComponents/Error'
import Loading from '../SharedComponents/Loading'


const SongsHorizontalList = ({ homepage }) => {

  const { allSongs, songsLoading, error } = useSelector((store) => store.currentTrack)



  if (songsLoading) {
    return <Loading />
  }

  if (error) {
    return <Error error='something went wrong' />
  }

  const Songs = homepage ? allSongs?.slice(0, 6) : allSongs


  return (

    <div className='  space-y-4 pl-5 md:pl-10 pr-3'>
      <div className='flex justify-between items-center xs:pr-3  '>
        {homepage && <h1 className='sm:text-3xl xs:text-xl text-white font-thin font-Comfortaa'>Popular Around You</h1>}
      </div>
      <div className=' rounded-lg grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 pt-1 xs:gap-5 md: '>

        {Songs?.map((song, index) => {


          return <SongCard key={index} {...song} index={index} />
        })}
      </div>
    </div>

  )
}

export default SongsHorizontalList
