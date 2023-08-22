import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoginModal } from '../../Features/modalSlice'
import { setToken, storeUserDetails } from '../../Features/userDetailSlice'







const NavLinks = () => {
  let { token } = useSelector(store => store.userDetails)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logInOutHandler = () => {
    if (token) {
      dispatch(storeUserDetails(''))
      dispatch(setToken(''))

    }
    navigate('/login')

  }

  const navigation = (e) => {
    console.log(token)
    if (!token) {
      e.preventDefault()
      dispatch(setLoginModal(true))

    }
  }


  const style = ({ isActive, isPanding }) =>
    isPanding ? "text-blue-300" : isActive ? "text-red-400 ease-in-out transition-all" : ""

  return (
    <div className='md:flex md:flex-row cursor-pointer  transition-all text-black ease-in-out md:justify-around md:items-center flex flex-col items-center justify-around   md:text-white h-full w-full   '>
      <NavLink to='/' className={style} >Home</NavLink>
      <NavLink to='/allsongs' className={style}>Library</NavLink>
      <NavLink to='/artists' className={style}>Artists</NavLink>
      <NavLink onClick={navigation} to='playlists' className={style}>Playlists</NavLink>
      <NavLink onClick={navigation} to='favourites' className={style}>Favourites</NavLink>
      <div>
        {token ? <div className='pb-3 text-base font-thin '>
          <Link to="/profile"> <img src="/profile-circle.svg" alt="profile pic" width='50px' /></Link>
          <button onClick={logInOutHandler}>logout</button>
        </div> : <button onClick={logInOutHandler} className='pr-3 pl-5 pt-2 pb-2 border-red-800 border-[0.1px] rounded-lg'>login</button>}
      </div>

    </div>
  )
}

export default NavLinks
