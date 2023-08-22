
import axios from "axios";
import { storeUserDetails } from '../../Features/userDetailSlice'
import { useState } from "react";
import { useNavigate, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../SharedComponents/Error'
import { years } from "../Profile/years";

export default function Form() {
  const { token } = useSelector(store => store.userDetails)
  const [additonalDetails, setAdditionalDetails] = useState({ nickname: '', month: '', year: '', gender: '', date: '' })
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(token)


  const handleNumber = (e) => {
    if (Number(e.target.value) >= 0) {
      setError(null)
      setAdditionalDetails({ ...additonalDetails, [e.target.name]: e.target.value })
      return
    }
    setError(`please enter valide ${e.target.name}`)
  }

  const genderHandler = (e) => {
    setError(null)
    setAdditionalDetails({ ...additonalDetails, gender: e.target.id })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!(0 < Number(additonalDetails.date) && Number(additonalDetails.date) <= 31)) {
      setError('please enter valid Date of Birth')
      return
    }


    if (additonalDetails.year.length !== 4 || (additonalDetails.year[0] != 1 && additonalDetails.year[0] != 2)) {
      setError('please enter valid Year of Birth')
      return
    }

    try {

      const res = await axios.patch(`https://musica-8uoh.onrender.com/update`, additonalDetails, {
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }

      });
      dispatch(storeUserDetails(res.data.data))
      navigate('/start')
    } catch (error) {
      console.log(error)
      setError(error?.response?.data || error?.response?.message)
    }

  }



  return (
    <div color="transparent" className=" p-4 rounded-md">
      {error ? <Error error={error} /> : ''}

      <form className="mt-8 mb-2  sm:w-96">
        <h2 color="gray" className="mb-2  font-bold">
          What should we call you?
        </h2>
        <div className="mb-2 flex flex-col">
          <input className="ml-2 px-4 mt-1 py-2 border rounded" type="text" placeholder="Name" value={additonalDetails.nickname} onChange={(e) => {
            setAdditionalDetails({ ...additonalDetails, nickname: e.target.value })
            setError(null)
          }} />
          <label className="pl-7 text-sm p-1">This appears on your profile</label>
        </div>
        <div className="mt-5">
          <h2 color="gray" className="mb-2  font-bold">
            What's your date of birth?
          </h2>
          <div className="flex space-x-2 ">
            <div>

              <div className='flex space-x-2 '>
                <input
                  type="number"
                  placeholder='YYYY'
                  id='DOB'
                  name='year'
                  onChange={handleNumber}
                  value={additonalDetails.year}
                  className=' bg-white pl-5 border border-gray-300 text-gray-900 outline-gray-500 text-sm font-semibold rounded-lg   block w-full p-2.5   dark:placeholder-gray-400 dark:text-white' />


                <select name='month' onChange={(e) => { setAdditionalDetails({ ...additonalDetails, month: e.target.value }) }} defaultValue={additonalDetails.month} className="bg-white border mb-1  pl-6 pb-2 h-10 border-gray-300  text-gray-900 outline-gray-500 text-sm font-semibold rounded-lg   block w-full p-2.5   dark:placeholder-gray-400 dark:text-white  ">
                  {years.map((item, index) => {
                    return <option key={index} className='capitalize' value={item}>{item}</option>

                  })}
                </select>

                <input
                  type="number"
                  placeholder='DD'
                  id='Day'
                  name='date'
                  onChange={handleNumber}
                  className=' bg-white border border-gray-300 pl- 5text-gray-900 outline-gray-500 text-sm font-semibold rounded-lg   block w-full p-2.5   dark:placeholder-gray-400 dark:text-white'
                  value={additonalDetails.date} />


              </div>



              {/* gender Radio Buttons */}

              <div className="mt-6">

                <h2 color="gray" className="mb-2  font-bold">
                  What's is your gender?
                </h2>
                <div className="flex space-x-3 ml-2">


                  <label htmlFor="Male">Male</label>
                  <input type="radio" id="Male" name="gender" onChange={genderHandler} />
                  <label htmlFor="Female">Female</label>
                  <input type="radio" id="Female" name="gender" onChange={genderHandler} />
                  <label htmlFor="Non-binary">Non-binary</label>
                  <input type="radio" id="Non-binary" name="gender" onChange={genderHandler} />
                  <label htmlFor="Other">Other</label>
                  <input type="radio" id="Other" name="gender" onChange={genderHandler} />
                </div>
                <div className="mt-4 ml-2">
                  <input type="radio" id="" name="gender" onChange={genderHandler} checked={!(additonalDetails.gender)} />
                  <span className="pl-2">Prefer not to say</span>

                </div>
              </div>


            </div>

          </div>
        </div>

        <div className="mt-5 flex justify-center space-x-6">
          <button className="rounded-full bg-green-500 mt-2 px-12 py-3 text-base font-bold text-black transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200 hover:px-11 "
            type="submit" onClick={handleSubmit}>
            Sign Up
          </button>

        </div>
      </form>
    </div>
  );
}