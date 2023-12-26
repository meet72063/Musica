import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentTrack, setIsplaying } from '../../../Features/CurrentTrack'
import { Close } from '@mui/icons-material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'



const Searchbar = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const { Library } = useSelector(state => state.currentTrack)


  //to close the searchInput result empty the searchInput
  const closeBtnHandler = () => {
    setSearchInput('')
  }

  const searchTrack = (search) => {
    //case insensitive search
    const regex = new RegExp(search, "i")
    const searchResult = Library.filter((song) => {
      return regex.test(song.name)
    })
    setSearchResult(searchResult)
  }

  const handleInput = (e) => {
    setSearchInput(e.target.value)
    if (e.target.value) {
      searchTrack(e.target.value)
    }
  }

  return (
    <div className='sm:ml-10 '>
      <div className='  flex gap-2'>
        <input type="text" placeholder='search any song....' className='text-red-400 tracking-wider bg-transparent border-[0.1px] w-full h-12 rounded-lg  border-gray-700 text-lg  p-6 focus:outline-none'
          value={searchInput}
          onChange={handleInput} />
      </div>
      {searchInput && <div className=' w-full mt-1   '>
        <div className='bg-white  relative w-full  rounded-md '>

          <div className='flex justify-end pr-5 items-center p-3 cursor-pointer hover:text-red-600' onClick={closeBtnHandler}><Close /></div>

          {/* search result*/}

          <div className='grid md:grid-cols-4 sm:grid-cols-4 grid-cols-2 gap-4  max-h-80 p-3 overflow-scroll '>
            {searchResult.length === 0 ? <span className='text-lg text-red-400 font-cursive ml-3'> No Result matching your search</span> : searchResult.map((song) => {
              return <Track key={song._id} track={song} />
            })}
          </div>
        </div>
      </div>}


    </div>


  )
}

export default Searchbar



// search result Song JSX

const Track = function ({ track }) {
  const dispatch = useDispatch()
  const handlePlay = () => {
    dispatch(setCurrentTrack(track))
  }

  return (
    <>
      <div className='inline-block text-black  rounded-md'>
        <span className='cursor-pointer hover:text-red-700' onClick={handlePlay}><FontAwesomeIcon icon={faMusic} /> {track.name} ({track.artist})</span>
      </div>
    </>
  )
}