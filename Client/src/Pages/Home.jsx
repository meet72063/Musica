import React, { useEffect, useState } from 'react'
import MainContent from '../Components/Home/MainContent'

import { useDispatch } from 'react-redux'
import { GetAllSongs,setError,setSongLoading,GetAllArtists,setArtistFechError,setArtistLoading,setCatogories} from '../Features/CurrentTrack'

import { getAllSongs,getAllArtists,getCatogories} from '../api/user'
import Loading from '../Components/SharedComponents/Loading'






const Home = () => {
  const [loading ,setLoading] = useState(false)
 
  const dispatch = useDispatch()



  useEffect(() => {
   
    const gettingsongs = async () => {
      try {
        setLoading(true)
        const { songs } = await getAllSongs()
        dispatch(GetAllSongs(songs))
       dispatch( setSongLoading(false))
       dispatch(setError(false))
       setLoading(false)

      } catch (error) {
        console.log(error)
        dispatch( setSongLoading(false))
        dispatch(setError(true))
       setLoading(false)

        
      }

    }
    gettingsongs()
  }, [])

  useEffect(()=>{
    const getartists = async ()=>{
        try {
        const Artists = await getAllArtists()
        
        dispatch(GetAllArtists(Artists))
        dispatch(setArtistLoading(false))
        dispatch(setArtistFechError(false))
        } catch (error) {
            console.log(error)
        dispatch(setArtistLoading(false))
           dispatch( setArtistFechError(true))
        }
       

    }
    getartists()
},[])


useEffect(()=>{
   const getCatogoriesFunc = async ()=>{
    try {
      const catogories = await getCatogories()
      dispatch(setCatogories(catogories))
    } catch (error) {
      console.log(error)
    }
   }
   getCatogoriesFunc()
},[])


if(loading){
   return <div className='h-screen'><Loading/></div>
}



  return (
    <div className= 'bg-transparent w-[100%] mb-0  pt-3 '>
           <MainContent/>
        </div>
   
  )
}

export default Home
