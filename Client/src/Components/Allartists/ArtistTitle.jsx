import React, { useEffect, useState } from 'react'
import ArtistIcons from '../Home/ArtistIcons'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../SharedComponents/Loading'
import Error from '../SharedComponents/Error'


const ArtistTitle = () => {
    const { allArtist, ArtistFetchError, artistLoading } = useSelector((store) => store.currentTrack)


    if (artistLoading) {
        return <div className='flex justify-center items-center'>
            <Loading />
        </div>

    }

    if (ArtistFetchError) {
        return <Error error='something went wrong' />
    }

    return (
        <div className='mt-10 ml-5 space-y-8'>
            <div className=' grid md:grid-cols-4 lg:grid-cols-5 sm:grid-cols-3 gap-5'>
                {allArtist?.map((artist, index) => {

                    return <ArtistIcons key={index} {...artist} />
                })}


            </div>
        </div>
    )
}

export default ArtistTitle
