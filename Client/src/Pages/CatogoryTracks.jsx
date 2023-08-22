import React from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import SongCard from '../Components/ArtistPlaylist/SongCard'
import { useSelector } from 'react-redux'


const CatogoryTracks = () => {
  const { id } = useParams()
  const { catogories } = useSelector(store => store.currentTrack)
  const [catogory] = catogories.filter((catogory) => catogory._id === id)



  return (
    <div className={`w-[100%] bg-[url('/catogory1.jpg')] xs:pl-5 sm:pl-20 pr-10 bg-cover min-h-screen pb-40 pt-10 bg-[rgba(0,0,0,0.7)] bg-blend-multiply `}>
      <h1 className='text-white xs:text-4xl sm:text-6xl font-Comfortaa font-light '>Listen to {catogory.name} Music <FontAwesomeIcon icon={faMusic} color='rgba(200,0,20,0.5)' /></h1>
      <h2 className='sm:ml-16 text-2xl text-red-600 font-cursive mt-2'> {catogory.description}</h2>
      <div className='mt-10 gap-1 grid lg:grid-cols-2'>

        {catogory.songs.map((track, index) => {
          return <SongCard key={index} {...track} albums={catogory.songs} />
        })}


      </div>


    </div>
  )
}

export default CatogoryTracks
