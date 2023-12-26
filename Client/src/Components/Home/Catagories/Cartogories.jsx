import React, { useEffect, useState } from 'react'
import { getCatogories } from '../../../api/user'
import { setCatogories } from '../../../Features/CurrentTrack'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../SharedComponents/Loading'
import Error from '../../SharedComponents/Error'
import { useNavigate } from 'react-router-dom'

const Cartogories = () => {
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(false)
  const { catogories } = useSelector(store => store.currentTrack)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const getCatogoriesFunc = async () => {
      try {
        setLoading(true)
        const catogories = await getCatogories()

        dispatch(setCatogories(catogories))

      } catch (error) {
        setErr(true)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (!catogories.length) {
      getCatogoriesFunc()
    }
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

      <div className='grid grid-cols-2 gap-x-5 gap-y-4 mr-3'>
        {catogories.map((catogory, index) => {

          return <div key={catogory._id} className={`h-16 rounded-md  bg-[url("./catogory${index + 1}.jpg")] bg-cover sm:text-[2.7rem] font-outfit bg-[rgba(0,0,0,0.7)] hover:text-5xl drop-shadow-[0_2px_2px_rgba(0,0,0,1) text-white  transition-all ease-in-out hover:bg-[rgba(0,0,0,0.8)] cursor-pointer bg-blend-multiply flex justify-center items-center`} onClick={() => navigate(`catogory/${catogory._id}`)}>
            <h2 className=' font-bold'>{catogory.name}</h2>
          </div>
        })}
      </div>


    </div>
  )
}

export default Cartogories
