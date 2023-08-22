import React, { useEffect, useState } from 'react'
import ArtistIcons from './ArtistIcons'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../SharedComponents/Loading'
import Error from '../SharedComponents/Error'


const ArtistsIconsList = () => {
    const  {allArtist,ArtistFetchError,artistLoading}  = useSelector((store)=>store.currentTrack)
   

if(artistLoading){
    return <Loading/>
}

if(ArtistFetchError){
    return <Error error='something went wrong' />
}
 
  return ( 
<div className='  space-y-8 pr-5'>
  <h1 className='text-3xl text-white font-thin pl-5 font-Comfortaa'>Artists</h1>
<div className=' grid md:grid-cols-4  lg:grid-cols-5 gap-2 xs:grid-cols-2'>
    {allArtist?.map((artist,index)=>{
     
        return  <ArtistIcons key={index} {...artist}/>
    })}

  
</div>
</div>
  )
}

export default ArtistsIconsList
