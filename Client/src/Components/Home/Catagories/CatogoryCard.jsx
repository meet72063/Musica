import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const CatogoryCard = () => {
    const { catogories } = useSelector(store => store.currentTrack)
    const navigate = useNavigate()
    let i = 0
    console.log(catogories)
    return (

        <div className='grid grid-cols-2 gap-x-5 gap-y-4 mr-3'>
            {catogories.map((catogory) => {
                i++
                return <div key={catogory._id} className={`h-16 rounded-md  bg-[url("./catogory${i}.jpg")] bg-cover sm:text-[2.7rem] font-outfit bg-[rgba(0,0,0,0.7)] hover:text-5xl drop-shadow-[0_2px_2px_rgba(0,0,0,1) text-white  transition-all ease-in-out hover:bg-[rgba(0,0,0,0.8)] cursor-pointer bg-blend-multiply flex justify-center items-center`} onClick={() => navigate(`catogory/${catogory._id}`)}>
                    <h2 className=' font-bold'>{catogory.name}</h2>
                </div>
            })}
        </div>
    )
}

export default CatogoryCard

