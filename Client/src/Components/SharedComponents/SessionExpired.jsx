import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSessionExpiredModal } from '../../Features/modalSlice'
import { Close } from '@mui/icons-material'
import { setToken, storeUserDetails } from '../../Features/userDetailSlice'

const SessionExpired = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLoginBtn = () => {
    dispatch(storeUserDetails(''))
    dispatch(setToken(''))
    navigate('/login')
    dispatch(setSessionExpiredModal(false))

  }

  const handleClose = () => {
    dispatch(storeUserDetails(''))
    dispatch(setToken(''))
    dispatch(setSessionExpiredModal(false))
    navigate('/')

  }

  return (
    <div className='min-h-screen w-full fixed  bg-[rgba(0,0,0,0.7)]' >
      <div className='z-20 fixed  top-0 w-full h-full grid place-content-center '>
        <div className=' w-80 sm:w-[33rem] h-80 sm:h-96 shadow-2xl shadow-gray-600  bg-white rounded-md grid place-content-center gap-10 relative border-gray-400 border-2'>
          <div className='absolute top-3 right-3 cursor-pointer' onClick={handleClose}><Close /></div>
          <div className='grid place-content-center'>
            <img src="https://www.globalsign.com/application/files/9516/0389/3750/What_Is_an_SSL_Common_Name_Mismatch_Error_-_Blog_Image.jpg" alt="" className='w-32 h-24 cursor-pointer' />

          </div>

          <div className=' grid gap-2'>
            <h1 className='text-center font-semibold text-4xl '>Session Expired</h1>
            <h2>please log in again to continue</h2>
          </div>

          <div className=' flex gap-x-4 place-content-center'>
            <button className='text-lg p-2 px-10 border-black border-[0.1px] rounded-3xl  hover:text-red-500' onClick={handleLoginBtn}>Login in</button>
          </div>


        </div>

      </div>

    </div>
  )
}

export default SessionExpired
