import React from 'react'
import SongsHorizontalList from '../Components/Home/SongsHorizontalList'
import Library from '../Components/AllSongs/Library'

const AllSongs = () => {
  return (
    <div className='bg-tansparent flex flex-col  gap-3  pb-40 pl-5 pr-3 min-h-screen'>
      <div className=' bg-transparent w-full pt-8 space-y-2'>
        <h1 className='text-3xl text-white font-thin pl-5 font-gorilla'>Popular Tracks</h1>
        <SongsHorizontalList />
      </div>
      <Library />
    </div>
  )
}

export default AllSongs
