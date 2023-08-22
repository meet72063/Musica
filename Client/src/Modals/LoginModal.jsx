import React from 'react'
import {} from '../Features/modalSlice'
import { useDispatch } from 'react-redux'
import {setLoginModal} from '../Features/modalSlice'
import { useNavigate } from 'react-router-dom'

const Modal = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = () =>{
     navigate('/login')
     dispatch(setLoginModal(false))
    }
  return (
    <div className=' w-[100%] grid place-content-center fixed  z-20 h-screen  bg-[rgba(0,0,0,0.7)] shadow-lg' onClick={()=>dispatch(setLoginModal(false))} >
      <div className=' bg-slate-100 border-[0.3px] border-slate-400  xs:w-56 xs:h-40 ms:w-72 p-1 ms:h-32  md:w-96 md:h-52  text-black relative  rounded-md ' onClick={(e)=>e.stopPropagation()}>
      <button onClick={()=>dispatch(setLoginModal(false))} className=' text-xl font-semibold hover:text-[23px] absolute right-4'>x</button>
         <div className= ' p-2  md:absolute top-8 left-5'>
           <div className='space-y-3'>
             <h1 className='text-2xl font-bold '>Not Logged In </h1>
                <h2>please login to save the songs</h2>
           </div>
         </div>
         <div className='space-x-3  xs:absolute right-2  bottom-2'>
                    <button className='bg-white w-24 h-8 rounded-lg font-semibold hover:bg-slate-200 active:bg-slate-300 ' onClick={()=>dispatch(setLoginModal(false))}  >Cancel</button>
                    <button className='bg-[rgba(200,0,0,0.7)] w-24 text-white font-semibld h-8 rounded-lg hover:bg-[rgba(200,0,0,0.6)]'onClick={handleLogin} >Login </button>
                </div>
      </div>
    </div>
  )
}

export default Modal
