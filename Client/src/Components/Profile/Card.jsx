import React from 'react'

const Card = () => {
  const [premiumMessage,setPremiumMessage] = React.useState(false)
  return (
    <div className='mt-8 '>
      <h1 className='text-2xl  font-semibold'>Your Plan</h1>
      <div  className='mt-5 rounded-2xl box outline-gray-300  border-gray-200 shadow-2xl border-[1px] h-[450px] '>
            <div className='border-none rounded-t-2xl text-3xl pl-5 font-bold pt-[100px] shadow-3xl drop-shadow-xl outline-[hsl(0,4%,63%)] bg-[hsl(0,4%,63%)] shadow-inherit h-[250px]'>
                  Musica Free
            </div>
            <div>
                 <div className='border-b-[0.2px] ml-5 mr-5 border-gray-200 pt-7 pb-9 pl-1 font-semibold text-gray-700  [word-spacing:1px]'>
               Play any song,any time,with ads. 
             
            </div>
            <div className='text-3xl tracking-wide pl-5 font-bold pt-6'>
                Free
            </div>
          
            </div>
           

          
            
      </div>
      <button className="  mt-6 rounded-full bg-transparent px-12 py-3 text-base font-bold text-gay transition duration-200  border-[1px] border-gray-700 hover:bg-gray hover:shadow-lg  "  onClick={()=>setPremiumMessage(true)}
          type="submit" >
          Join Premium
        </button>
        {premiumMessage&&<h1 className='text-green-700'>Sorry! we are unable to provide this service</h1>}
    </div>

  )
}

export default Card
