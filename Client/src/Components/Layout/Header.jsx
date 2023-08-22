import { MusicNoteSharp, Menu, Close } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import NavLinks from './NavLinks'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  const [mobileView, setMobileView] = useState(false)

  const { pathname } = useLocation()

  useEffect(() => {
    setMobileView(false)
  }, [pathname])
  return (
    <div className='md:h-24 h-16  bg-[rgba(0,0,0,0.8)]  w-full text-white text-xl font-Comfortaa flex items-center  md:pt-0  md:pl-6 md:pr-5  flex-wrap '>
      <div className='md:w-2/6 w-full ml-3 md:ml-0 h-16 flex text-[#daa89b] items-center justify-between'>
        <h1 className='text-white xs:text-4xl sm:text-4xl font-cursive font-light  cursor-pointer'>Musica<FontAwesomeIcon icon={faMusic} color='rgba(200,0,20,0.5)' className='ml-2' /></h1>


        <span className='md:hidden mr-5 text-[#00ffff] cursor-pointer' onClick={() => setMobileView(!mobileView)}>{mobileView ? <Close /> : <Menu />}</span>
      </div>
      <div className=' hidden md:block w-4/6'>
        <NavLinks />
      </div>

      {mobileView && <div className=' md:hidden w-full h-screen  bg-[rgb(250,235,215)] pb-40 z-10 '>
        <NavLinks />
      </div>}


    </div>
  )
}

export default Header
