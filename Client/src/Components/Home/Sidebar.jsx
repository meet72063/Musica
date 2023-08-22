import React from 'react'
import { HomeSharp, SearchRounded, LibraryMusicSharp, AddSharp, ArrowForwardSharp } from '@mui/icons-material';

const Sidebar = () => {
    return (
        <div className='w-[30%] grid grid-rows-[0.2fr]  bg-black gap-y-3'>
            <div className='bg-zinc-900 rounded-md pb-4 flex-col pt-3 pl-3'>
                <div className='mb-2  flex gap-x-4 '>
                    <HomeSharp className='text-white' />
                    <h1 className=' font-semibold text-white'>Home</h1>
                </div>
                <div className='pt-2 flex gap-x-4 '>
                    <SearchRounded className='text-white' />
                    <h1 className=' font-semibold text-[rgb(210,210,210)]'>Search</h1>
                </div>
            </div>
            <div className='bg-zinc-900 rounded-lg '>
                <div className='flex justify-between pl-2 pr-2 mt-3 text-[rgb(100,100,100)] '>
                    <div className='flex gap-x-2 justify-center '>
                        <LibraryMusicSharp className='text-white pt-1' />
                        <h2 className='text-[20px]'>Your Library</h2>
                    </div>

                    <div className='flex gap-x-2 pt-1'>
                        <AddSharp />
                        <ArrowForwardSharp />
                    </div>

                </div>
                <div className=' bg-zinc-900 grid grid-rows-[150px_200px] pl-2  pr-2 pt-2 gap-y-3 rounded-lg mt-2  text-white'>
                    <div className='bg-zinc-800 flex flex-col place-content-center rounded-lg pb-2 pl-3 pt-1'>
                        <h2 className='mb-2 font-semibold text-lg'> Create your first playlist</h2>
                         <h2 className='mb-3'>It's easy we'll help you</h2>
                        <button className=' mb-3 h-7 w-48 rounded-full pl-3 ml-3 font-semibold pr-2 text-[rgb(10,10,10)] bg-white text-center cursor-pointer '>Create playlist</button>
                        
                  </div>
                    <div className='bg-zinc-800 mb-2 place-content-center flex flex-col gap-y-3 pl-3 pr-3 align-middle  rounded-lg'>
                        <h2 className='font-semibold text-lg'>Let's find some podcasts to follow</h2>
                        <h2>we'll keep you updated  on new episodes</h2>
                        <button className=' h-8 w-48 rounded-full pl-3 ml-3 font-semibold pr-2 text-[rgb(10,10,10)] bg-white  cursor-pointer '>Browse podcasts</button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Sidebar
