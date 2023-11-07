import React, { useEffect, useState } from 'react'
import ArtistIcons from './ArtistIcons'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../SharedComponents/Loading'
import Error from '../SharedComponents/Error'
import { getAllArtists } from '../../api/user'
import { GetAllArtists, setArtistFechError, setArtistLoading } from '../../Features/CurrentTrack'


const ArtistsIconsList = () => {
  const { allArtist, ArtistFetchError, artistLoading } = useSelector((store) => store.currentTrack)

  const dispatch = useDispatch()

  useEffect(() => {
    const getartists = async () => {
      try {
        dispatch(setArtistLoading(true))
        const Artists = await getAllArtists()

        dispatch(GetAllArtists(Artists))
        dispatch(setArtistLoading(false))
        dispatch(setArtistFechError(false))
      } catch (error) {
        console.log(error)
        dispatch(setArtistLoading(false))
        dispatch(setArtistFechError(true))
      }


    }
    getartists()
  }, [])


  if (artistLoading) {
    return <Loading />
  }

  if (ArtistFetchError) {
    return <Error error='something went wrong' />
  }

  return (
    <div className='  space-y-8 pr-5'>
      <h1 className='text-3xl text-white font-thin pl-5 font-Comfortaa'>Artists</h1>
      <div className=' grid md:grid-cols-4  lg:grid-cols-5 gap-8 xs:grid-cols-2'>
        {allArtist.map((artist, index) => {

          return <ArtistIcons key={index} {...artist} />
        })}


      </div>
    </div>
  )
}

export default ArtistsIconsList
