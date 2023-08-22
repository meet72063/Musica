import React from 'react'
import { AddCircleOutlineSharp } from '@mui/icons-material'


const Song = () => {
  return (
    <div className='md:w-[50vw]'>
    <div className='bg-red-300  rounded-md pl-5  '>
        <div className='flex place-items-center justify-between pr-7 '>
            <div className='flex  gap-5 pt-2 ' >
                <img src='/musicwheel.jpg' className=' h-10 w-10 rounded-full' />

                <span className="mt-2 text-black" >why you not entertained</span>
                <span className="mt-2 text-zinc-700 " >russ</span>
            </div>
            <div className=''>
                <button className="text-green-600" >
                    <AddCircleOutlineSharp />

                </button>
            </div>
        </div>

    </div>
</div>

    
  )
}

export default Song
