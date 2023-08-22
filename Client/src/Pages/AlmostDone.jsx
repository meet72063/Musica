import React, { useState } from 'react'
import Form from '../Components/AlmostDone/Form'

const AlmostDone = () => {
  return (
    <div className=' bg-slate-400  min-h-screen pb-40'>
      <main>
        <div className='flex-col '>
        <div className=" p-3  text-black flex flex-col align-center ">
       
        <div className='mt-[48px] flex justify-center'>
          <h2 className=' text-[40px] font-bold'>Almost Done</h2>
        </div>
        
       
      </div >
      
        
          <div className='flex justify-center '>
            <Form />
           
          </div>
          
                
           
      
        </div>
      </main>
    </div>
  )
}

export default AlmostDone
