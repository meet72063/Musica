import React, { useRef, useState } from 'react'
import DispalyTrack from './DispalyTrack'
import Control from './Control'
import { useSelector } from 'react-redux'







const AudioPlayer = () => {
  const { currentplaying, isPlaying } = useSelector((store) => store.currentTrack)



  const [progressValue, setProgressValue] = useState(0)
  const [duration, setDuration] = useState(0)
  const [loop, setLoop] = useState(false)


  const audioRef = useRef()
  const progressRef = useRef()

  return (
    <div className='  w-[100%] bg-black z-20  align-text-bottom  fixed bottom-0 border-t-[0.2px] border-b-[0.2px]  border-slate-600 ' >
      <div className='pl-3 ' >
        <div className='grid grid-cols-[50%_50%] pt-3 sm:pb-2 gap-x-10 sm:pl-20 bg-transparent text-white '>
          <div className='pt-4'  >
            <DispalyTrack {...{ audioRef, currentplaying, isPlaying, progressRef, progressValue, setProgressValue, duration, setDuration, loop }} />

            <Control {...{ audioRef, currentplaying, isPlaying, progressRef, progressValue, setProgressValue, duration, setDuration, loop, setLoop }} />

          </div>
          <div className=' pl-2   pr-5  sm:pr-10 sm:text-3xl '>

            <div className='flex sm:gap-10 sm:justify-between  justify-around pr-5 items-center'>
              <div className='sm:flex gap-6 items-center'>
                <h1 className='font-thin font-sans text-center  '>{currentplaying?.name} </h1>
                <h2 className='text-red-500 sm:text-xl text-center sm:text-start font-cursive text-xs  font'>{currentplaying?.artist}</h2>
              </div>

              <img src={currentplaying.img || '/musicwheel.png'} alt="musicIcon" className={` sm:w-[70px] pb-1 sm:h-[70px]  w-10 h-10  rounded-2xl bg-blend-lighten shadow-gray-700 `} />

            </div>




          </div>



        </div>
      </div>
    </div>
  )
}

export default AudioPlayer
