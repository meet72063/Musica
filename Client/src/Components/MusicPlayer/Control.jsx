import React, { useEffect, useRef, useCallback, useState } from 'react'
import { PlayCircleOutline, PauseCircle, SkipNext, SkipPrevious, SkipPreviousTwoTone, SkipNextTwoTone, LoopSharp } from '@mui/icons-material'
import { setIsplaying, setCurrentTrack } from '../../Features/CurrentTrack'
import { setPlayList, setShuffle, shuffleSongs } from '../../Features/SongSlice'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../SharedComponents/Error'
import { faHeart, faShuffle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addToFavouritePlaylist, removeFromFavouritePlaylist } from '../../Features/userDetailSlice'
import { setLoginModal, setSessionExpiredModal } from '../../Features/modalSlice'
import axios from 'axios'





const Control = ({ isPlaying, audioRef, setProgressValue, progressRef, duration, currentplaying, error, loop, setLoop }) => {
  const { Library } = useSelector((store) => store.currentTrack)
  const { playlist, shuffle } = useSelector(store => store.songs)
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

  // The 'repeat' function is responsible for updating the progress bar based on the
  // current time of the playing audio. It utilizes requestAnimationFrame for optimal performance.

  const repeat = useCallback(() => {
    // Retrieve the current time of the playing audio (elapsed seconds).
    const currentTime = audioRef.current?.currentTime;

    // Set the progress value to match the elapsed duration of the song
    // (convert it from a float to an integer in DisplayTrack component).
    setProgressValue(currentTime);

    // Synchronize the progress bar with the song duration.
    progressRef.current.value = currentTime;

    // Hold the animationRef ID to cancel when the song pauses, triggering the repeat function again.
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, setProgressValue, progressRef, duration]); //rebuilt this func when new song get added (duration change)
  //pass this func to next useEffect to play/pause the next song on additon if current song was playing/paused or alternativly pass duration as a dependecy to next useffect




  // The useEffect hook ensures that the 'repeat' function is appropriately executed
  // based on changes in the 'isPlaying' state. If the audio is playing, the function
  // continues to update the progress bar. When the audio is paused, the animation is canceled.
  // play/pause the next added song if current song was playing/paused
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      playAnimationRef.current = requestAnimationFrame(repeat);
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(playAnimationRef.current);
    }
  }, [isPlaying, repeat]);




  // shuffle/unshuffle
  const shuffleBtnHandler = () => {
    dispatch(setShuffle())
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
      <button className={`text-xl ${shuffle && 'text-green-700'} `} >
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
