import React, { useState } from 'react'
import { years } from './years';
import { useDispatch, useSelector } from 'react-redux'
import { storeUserDetails } from '../../Features/userDetailSlice'
import Error from '../SharedComponents/Error'

import axios from 'axios'





const EditProfile = ({ setEditProfile }) => {
    const { token, userDetails: data } = useSelector(store => store.userDetails)
    const { email, date, gender, country, year, month } = data
    const [userDetails, setUserDetails] = useState({ email, date, gender, country, year, month })
    const [err, setErr] = useState(null)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }

    const handleNumber = (e) => {
        if (Number(e.target.value) >= 0) {
            setErr(null)
            setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
            return
        }
        setErr(`please enter valide ${e.target.name}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!(0 < Number(userDetails.date) && Number(userDetails.date) < 32)) {
            setErr('Please enter valid Date ')
            return
        }
        if (userDetails.year.length !== 4 || (userDetails.year[0] != 1 && userDetails.year[0] != 2)) {
            setErr('please enter valid Year')
            return
        }

        try {


            const res = await axios.patch(`https://musica-8uoh.onrender.com/update`, userDetails, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }

            });

            dispatch(storeUserDetails(res.data.data))
            setEditProfile(false)
        } catch (error) {
            setErr(error?.response?.data?.error || error?.response?.message)
        }

    }



    return (
        <div className=''>
            <h1 className='font-semibold 4xl sm:text-6xl '>Edit profile</h1>
            <form action="" className='mt-10 space-y-6'>
                <div className='space-y-2'>
                    <div className='flex space-x-10'>
                        <label htmlFor="email" className='font-semibold'>Email</label>
                        {err ? <Error error={err} /> : ''}
                    </div>

                    <input type="email"
                        id='email'
                        value={userDetails.email}
                        onChange={handleChange}
                        name='email'
                        className='w-full h-[3rem] rounded-md p-3 font-semibold border-gray-300 border-[1.3px]  outline-gray-500' />

                </div>

                <div className='space-y-2'>
                    <label htmlFor="gender" className='font-semibold'>Gender</label>
                    <select id="gender" name='gender' onChange={handleChange} className="bg-white border border-gray-300 text-black outline-gray-500 text-sm font-semibold rounded-lg   w-full p-2.5   dark:placeholder-gray-400 dark:text-white  " defaultValue={gender} >
                        <option value={userDetails.gender} className='capitalize' >{userDetails.gender}</option>
                        <option value="female" >Female</option>
                        <option value="Male">Male</option>
                        <option value="non-binary">Non-binary</option>


                        <option value="other">Other</option>
                    </select>
                </div>

                <div className='space-y-2 '>
                    <label htmlFor="DOB" className='font-semibold '>Date Of birth</label>

                    <div className='flex space-x-2 '>
                        <input
                            type="number"
                            placeholder='YYYY'
                            id='DOB'
                            name='year'
                            onChange={handleNumber}
                            value={userDetails.year}
                            className=' bg-white text-center border-gray-300 text-black outline-gray-500 text-sm font-semibold rounded-lg    w-full   dark:placeholder-gray-400 dark:text-white' />


                        <select id="month" name='month' defaultValue={month} className="bg-white border h-10  overflow-y-scroll border-gray-300  text-black outline-gray-500 text-sm font-semibold rounded-lg   block w-full text-center  dark:placeholder-gray-400 dark:text-white " onChange={handleChange}>
                            <option value={month} className='capitalize'>{month}</option>
                            {years.map((item, index) => {
                                if (item !== month) return <option key={index} className='capitalize px-5' value={item} >{item}</option>

                            })}
                        </select>

                        <input
                            type="number"
                            placeholder='DD'
                            id='Day'
                            name='date'
                            onChange={handleNumber}
                            className=' bg-white border border-gray-300  text-center text-black outline-gray-500 text-sm font-semibold rounded-lg   block w-full p-2.5   dark:placeholder-gray-400 dark:text-white'
                            value={userDetails.date} />


                    </div>

                    <div className='space-y-2'>
                        <label htmlFor="country" className='font-semibold'>Country</label>
                        <select name='country' id="country" onChange={handleChange} className="bg-white border border-gray-300 text-black outline-gray-500 text-sm font-semibold rounded-lg   block w-full p-2.5   dark:placeholder-gray-400 dark:text-white  " defaultValue={country} >
                            <option value={userDetails.country}  >{userDetails.country}</option>
                            <option value="US">US</option>
                            <option value="England">England</option>
                            <option value="UAE">UAE</option>
                            <option value={country}>{country}</option>
                        </select>
                    </div>

                    <div className='flex justify-end space-x-3'>
                        <button className="rounded-full bg-transparent px-10 mt-5  py-3 text-base font-bold text-black transition duration-200 hover:bg-gray-100 active:outline-1 active:outline-black  dark:text-white dark:hover:bg-green-300  "
                            type='button' onClick={() => setEditProfile(false)}>
                            cancel
                        </button>
                        <button className="rounded-full bg-green-400 px-10 mt-5  py-3 text-base font-bold text-black transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200 hover:px-11 "
                            type="submit" onClick={handleSubmit}>
                            Save
                        </button>
                    </div>


                </div>

            </form>
        </div>
    )
}

export default EditProfile
