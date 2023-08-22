import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-black pt-10  text-white pl-20 h-56 w-screen pr-20 grid grid-cols-[230px_300px_300px_300px] '>
      <div className='flex space-x-2 '>
      <NavLink to='/'>
            <img src="./Spotify.png" alt="spotify icon" className="w-9 " />
          </NavLink>
          <span className=" font-semibold text-2xl pr-3">Musica</span>

      </div>
      <div>
        <h1 className='uppercase pb-3 text-gray-400  font-medium [ letter-spacing:3px]'>Company</h1>
        <div className='space-y-2 cursor-pointer'>
        <h2 className='cursor-pointer'>About</h2>
        <h2 className='cursor-pointer'>Jobs</h2>
        <h2  className='cursor-pointer'>For the Record</h2>
        </div>
       
      </div>
      <div>
        <h1 className='uppercase text-gray-400  font-medium [ letter-spacing:3px]  pb-3'>Communities</h1>
        <div className='space-y-2 '>
        <h2 className='cursor-pointer'>For Artists</h2>
        <h2 className='cursor-pointer'>Developers</h2>
        <h2 className='cursor-pointer'>Advertising</h2>
        <h2 className='cursor-pointer'>Musica for Work</h2>

        </div>
      </div>
      <div>
        <h1 className='uppercase pb-3 text-gray-400  font-medium'>useful links</h1>
        <div className='space-y-2 '>
        <h2 className='cursor-pointer'>Support</h2>
        <h2 className='cursor-pointer'>Web Player</h2>
        <h2 className='cursor-pointer'>Free Mobile App</h2>
        </div>
       
      </div>
    </div>
  )
}

export default Footer
