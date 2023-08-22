import React from 'react'
import ArtistTitle from './ArtistTitle'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




const Artists = () => {
  return (
    <div className='min-h-screen width-[100%] pb-40 xs:pt-5 pl-5 sm:pt-2 bg-transparent'>
      <div className='mt-8 space-y-20'>
        <h1 className='xs:text-4xl sm:text-3xl tracking-wide sm:text-gray-300 font-thin font-cursive '>Explore the Artists playlist<FontAwesomeIcon icon={faMusic} color='rgba(200,0,20,0.5)' className='ml-2' /></h1>

        <ArtistTitle />

      </div>
    </div>
  )
}

export default Artists
