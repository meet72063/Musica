import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { getData } from '../localStorage'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, storeUserDetails } from '../Features/userDetailSlice'


const Start = () => {
  const { userDetails, token } = useSelector(store => store.userDetails)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logOuthandler = () => {
    dispatch(setToken(''))
    dispatch(storeUserDetails(''))
    navigate('/login')
  }

  const goToWebPlayer = () => {
    navigate('/')
  }

  const goToProfile = () => {
    navigate('/profile')
  }



  return (
    <main className='bg-slate-300 h-screen'>
      <div className='flex-col  border-y-gray-300 border-b-[1px] mb-5 '>
        <div className="pt-[20px] pb-[0px] pl-[35px] pr-[0px] text-black flex flex-col align-center ">
          <div className="flex space-x-2 justify-center pr-6 mb-6">
            <NavLink to='/'>
              <img src="./spotify2.png" alt="spotify icon" className="w-11" />
            </NavLink>
            <span className=" font-bold text-3xl pt-1 ">Musica</span>
          </div>
        </div>
      </div>
      <div className='pl-[10px] pr-[10px] p-t[10px] pb-[10px] flex flex-shrink flex-grow justify-center '>
        <div className='max-w-[450px] w-[450px] '>
          <div className='flex flex-col gap-[10px] '>
            <div className='flex flex-col align-middle '>
              <div className='mb-[12px] flex justify-center'>
                <p className='max-w-[140px]  text-[14px] font-[400]  '>
                  Logged in as <span className='uppercase'>{userDetails?.name}</span>
                </p>
              </div>
            </div>
            <button className="rounded-full uppercase tracking-widest bg-green-500 px-12 py-3 text-base font-bold text-black transition duration-200 hover:bg-green-500 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200 hover:px-11 " onClick={goToProfile} >
              Account overview
            </button>
            <div className='flex'>
              <hr className='border-r-[1px] border-l-[1px] block border-t-gray-500 mb-[20px] mt-[20px]' />
              <div className='flex justify-center'>
                <span className=' pl-52  text-[14px] uppercase self-center'>or</span>
              </div>
            </div>
            <button className="rounded-full bg-transparent px-12 py-3 text-base font-bold text-gray-600 transition duration-2000 border-gray-600 border-[1px] hover:px-11 uppercase hover:border-black hover:border-[1.5px]" onClick={goToWebPlayer}  >
              Web player
            </button>

          </div>

        </div>

      </div>
      <div className='flex justify-center'>
        <button className="rounded-full bg-transparent mt-10 px-5 py-3 text-base font-bold text-gray-700 transition duration-2000   hover:px-11 uppercase hover:border-black " onClick={logOuthandler} >
          log out
        </button>
      </div>

    </main>
  )
}

export default Start
