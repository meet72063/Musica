import React, { useState } from 'react'
import Card from './Card'
import Details from './Details'
import EditProfile from './EditProfile'




const Main = () => {
  const [editProfile,setEditProfile] = useState(false)
  




  return (
    <div className='bg-slate-800  w-full h-full pb-20 '>
      <div className='  grid grid-cols-1  '>
        <div className='lg:grid place-content-center '>
         

          <div className='flex flex-col border-[0.1px] bg-slate-300  border-black p-8 lg:p-16  mt-5 mb-20 '>

           {editProfile?<EditProfile setEditProfile={setEditProfile}/>:<Details setEditProfile={setEditProfile} />}
            <div>
              <Card />
            </div>
          </div>
 
        </div>




      </div>
    </div>
  )
}

export default Main
