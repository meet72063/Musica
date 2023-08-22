import React, { useEffect, useRef, useCallback, useState } from 'react'
import { PlayCircleOutline, PauseCircle, SkipNext, SkipPrevious, SkipPreviousTwoTone, SkipNextTwoTone, LoopSharp } from '@mui/icons-material'
import { setIsplaying, setCurrentTrack } from '../../Features/CurrentTrack'
import { setPlayList, setShuffle, shuffleSongs } from '../../Features/SongSlice'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../SharedComponents/Error'
import { faHeart, faShuffle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addToFavouritePlaylist, removeFromFavouritePlaylist, setToken, storeUserDetails } from '../../Features/userDetailSlice'
import { setLoginModal, setSessionExpiredModal } from '../../Features/modalSlice'
import axios from 'axios'


// const userDetails = getData()


const Control = ({ isPlaying, audioRef, setProgressValue, progressRef, duration, currentplaying, error, loop, setLoop }) => {
  const { Library } = useSelector((store) => store.currentTrack)
  const { playlist, shuffle, notShuffledTracks } = useSelector(store => store.songs)
  const { token, userDetails } = useSelector((store) => store.userDetails)
  const [favourite, setFavourite] = useState(false)
  let index


  const dispatch = useDispatch()
  const playAnimationRef = useRef()

  useEffect(() => {
    if (playlist.length === 0) {
      dispatch(setPlayList(Library))
    }
  }, [])

  useEffect(() => {
    if (!userDetails) {
      setFavourite(false)
    }
  }, [userDetails])


  //to check wheather track is in favourite playlist or not 
  useEffect(() => {
    let arr = userDetails?.likedSongs?.filter((song) => song._id === currentplaying._id)
    if (!arr) {
      setFavourite(false)
      return
    }
    if (arr?.length !== 0) {
      setFavourite(true)
    } else {
      setFavourite(false)
    }

  }, [currentplaying, userDetails])



  //upload favourite songs
  useEffect(() => {

    if (token) {
      const pushFavouriteSongs = async () => {

        try {

          const res = await axios.patch(`https://musica-8uoh.onrender.com/favouriteSongs`, userDetails.likedSongs, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

        } catch (err) {
          const { error } = err.response.data
          if (error === 'TokenExpiredError') {
            dispatch(setSessionExpiredModal(true))
            return
          }
          console.log(err)
        }
      }
      pushFavouriteSongs()
    }

  }, [userDetails.likedSongs])


  playlist?.some((song, i) => {
    if (song._id === currentplaying._id) {
      index = i
      return true
    }
  })

  const loopHandler = () => {
    setLoop(!loop)
  }

  const favouriteHandler = () => {
    if (!token) {
      dispatch(setLoginModal(true))
      return
    }
    if (favourite) {
      dispatch(removeFromFavouritePlaylist(currentplaying))
      setFavourite(false)
    } else {
      dispatch(addToFavouritePlaylist(currentplaying))
      setFavourite(true)
    }
  }


  const setPreviousSong = () => {
    if (index > 0) {
      const newIndex = index - 1
      dispatch(setCurrentTrack({ ...playlist[newIndex] }))
    } else {
      const newIndex = playlist.length - 1
      dispatch(setCurrentTrack({ ...playlist[newIndex] }))
    }

  }

  const setNextSong = () => {
    let maxIndex = playlist.length - 1
    if (index === maxIndex) {
      dispatch(setPlayList(Library))
      dispatch(shuffleSongs())
      dispatch(setCurrentTrack({ ...playlist[0] }))


    } else if (index === undefined) {
      console.log(index)
      dispatch(setCurrentTrack({ ...playlist[0] }))

    }
    else {
      const newIndex = index + 1
      dispatch(setCurrentTrack({ ...playlist[newIndex] }))
    }

  }



  const repeat = useCallback(() => {
    const currentTime = audioRef.current?.currentTime
    setProgressValue(currentTime)
    progressRef.current.value = currentTime

    playAnimationRef.current = requestAnimationFrame(repeat)

  }, [duration])


  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
      playAnimationRef.current = requestAnimationFrame(repeat)

    } else {
      audioRef.current.pause()
      cancelAnimationFrame(playAnimationRef.current)

    }

  }, [isPlaying, repeat])


  //shuffle songs 
  const shuffleBtnHandler = () => {
    if (!shuffle) {
      dispatch(setShuffle(true))
      dispatch(shuffleSongs())
    }
    else {
      dispatch(setShuffle(false))
      dispatch(setPlayList(notShuffledTracks))
    }
  }


  return (

    <div className='flex justify-start xs:text-xs sm:justify-center gap-x-1 sm:gap-x-4 sm:ml-10'>
      <button onClick={setPreviousSong}>
        <SkipPrevious />
      </button>
      <button onClick={() => audioRef.current.currentTime -= 10}>
        <SkipPreviousTwoTone />
      </button>
      <button onClick={() => dispatch(setIsplaying(!isPlaying))} >
        {isPlaying ? <PauseCircle /> : <PlayCircleOutline />}
      </button>
      <button onClick={() => audioRef.current.currentTime += 10}>
        <SkipNextTwoTone />
      </button>
      <button onClick={setNextSong}>
        <SkipNext />
      </button>
      <button onClick={loopHandler}>
        <LoopSharp className={`text-${loop ? 'green-700' : 'white'} ml-1`} />
      </button>
      <button className={`text-xl ${shuffle && 'text-green-700'} `} onClick={shuffleBtnHandler}>
        <FontAwesomeIcon icon={faShuffle} onClick={shuffleBtnHandler} />
      </button>

      <button className='ml-2 relative' onClick={favouriteHandler} >
        {favourite ? <FontAwesomeIcon icon={faHeart} style={{ color: "#e61414", }} /> :
          <FontAwesomeIcon icon={faHeart} />
        }

      </button>

      {error && <Error />}

    </div>

  )
}

export default Control
