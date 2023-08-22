import React, { useState } from 'react'
import { Close, MusicNoteSharp } from '@mui/icons-material'
import { Link , useNavigate} from 'react-router-dom'
import {getData} from '../../localStorage'
import { setOpenModal } from '../../Features/modalSlice'
import { useDispatch } from 'react-redux'
import {setFavouritePlaylist} from '../../Features/UserPlaylistSlice'
import {Menu} from '@mui/icons-material'

import './navbar.css'

const NavBar = () => {

  const userDetails = getData()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [mobileView,setMobileView] = useState(false)
  
   const logInOutHandler=()=>{
   if(userDetails){
     localStorage.removeItem("token")
     localStorage.removeItem("userDetails")
     localStorage.removeItem("persist:root")
     dispatch(setFavouritePlaylist([]))
}
   navigate('/signUp')
  
  }

 const handlePlaylistPage = ()=>{
  if(!userDetails){
    dispatch( setOpenModal(true))
  }
  else{
    navigate('/playlists')
  }
 }

 const handleFavouritePage =()=>{
  if(!userDetails){
    dispatch(setOpenModal(true))
  }
  else{
    navigate('/favourites')
  }
 }
  return (
    <div >
      <nav className={`navbar ${mobileView && "mobile-view"}`}>
        {/* logo */}
        <div className='logo'>
          <div>
            <img src="/Spotify.png" alt="logo" width="50px" height="50px" />
          <MusicNoteSharp />
          <h1 className=''> Musica</h1>
          </div>
          
          <button className='hamburger'>
         { mobileView? <Close onClick={()=>setMobileView(false)}/>:<Menu  onClick={()=>setMobileView(true)}/> }

        </button>
        </div>
       

        <Link to='/' >Home</Link>
        <Link to='/artists'  >Artists</Link>
        <Link to='/allsongs'>Songs</Link>
        <button  onClick={handlePlaylistPage}>Playlists</button>
        <button onClick={handleFavouritePage} >Favourites</button>
        <div className='profile'>
        {userDetails? <div >
            <Link to="/profile"> <img src="/profile-circle.svg" alt="profile pic" width='50px'  /></Link>
         <h2 onClick={logInOutHandler}>logout</h2>
          </div>:<button onClick={logInOutHandler}>login</button>}
        </div>
      
        {/* center nav */}


      </nav>
    </div>
  )
}

export default NavBar
