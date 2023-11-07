import React, { useEffect, useState } from 'react'
import CatogoryCard from './CatogoryCard'
import { getCatogories } from '../../../api/user'
import { setCatogories } from '../../../Features/CurrentTrack'
import { useDispatch } from 'react-redux'
import Loading from '../../SharedComponents/Loading'
import Error from '../../SharedComponents/Error'

const Cartogories = () => {
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(false)
  const dispatch = useDispatch()


  useEffect(() => {
    const getCatogoriesFunc = async () => {
      try {
        setLoading(true)
        const catogories = await getCatogories()
        dispatch(setCatogories(catogories))
        setLoading(false)
        setErr(false)
      } catch (error) {
        setLoading(false)
        setErr(true)
        console.log(error)
      }
    }
    getCatogoriesFunc()
  }, [])


  if (loading) {
    return <div className='h-screen'><Loading /></div>
  }

  if (err) {
    return <Error error='something went wrong' />
  }

  return (
    <div className='pl-5 space-y-8'>
      <h1 className='text-3xl text-white font-thin '>Catogories</h1>
      <CatogoryCard />

    </div>
  )
}

export default Cartogories
