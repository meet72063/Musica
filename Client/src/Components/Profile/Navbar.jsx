import React from 'react'
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';



const Navbar = () => {
  const [dropDown, setDropDown] = useState(false)
  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userDetails')
    navigate('/login')
  }

  return (
    <nav className='flex bg-black text-white w-full h-20 justify-between items-center '>
      <div className='flex '>

        <NavLink to='/' className="flex space-x-2  items-center ">
          <img src="./Spotify.png" alt="spotify icon" className="w-9 " /> <span className=" font-semibold text-2xl pr-3">Musica</span>
        </NavLink>
      </div>
      <div className='' >
        <div className='flex text-1xl font-semibold '>
          <Link to='/playlists'>Playlists</Link>
          <Link to='/favourites'>Favourites</Link>
          <span>|</span>
          <div className='text-white flex space-x-3 justify-center'>
            <AccountCircleOutlinedIcon />

            <span className=''>Profile</span>
            <div className='flex flex-col  '>
              <KeyboardArrowDownSharpIcon onClick={() => setDropDown(!dropDown)} />


              {dropDown ? <div className='bg-black text-white  cursor-pointer   rounded-sm' onClick={logOut} >
                <h1  >log Out</h1>
              </div> : ''}

            </div>

          </div>

        </div>



      </div>


    </nav>
  )
}

export default Navbar
