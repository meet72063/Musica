
import { useState } from "react";
import axios from 'axios'
import Error from "../SharedComponents/Error";
import { useNavigate, NavLink } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setToken, storeUserDetails } from "../../Features/userDetailSlice";


export default function InputLogin() {
  const [userDetails, setUserDetails] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setError(null)
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(`${process.env.SERVER_URL}/login`, userDetails)
      const { data, token } = response.data
      dispatch(storeUserDetails(data))
      dispatch(setToken(token))


      navigate('/')

    } catch (error) {
      console.log(error)
      setError(error.response?.data?.error || error.response?.data || 'something went wrong')
    }
  }


  return (
    <div color="transparent" className="text-white flex flex-col items-center "  >
      <h2 variant="h4" color="blue-gray">
        Enter Details
      </h2>
      {error ? <Error error={error} /> : ''}
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 flex flex-col items-center ">
        <div className="mb-4 flex flex-col gap-6 text-black">
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-white">Email</label>
            <input id="email" className="pl-2 font-extrabold tracking-widest rounded-sm w-56 " color="white" label="Email" name="email" value={userDetails.email} onChange={handleChange} />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="text-white">Password</label>
            <input id="password" className="pl-2 w-56 font-extrabold tracking-widest rounded-sm" color="white" type="password" label="Password" name="password" value={userDetails.password} onChange={handleChange} />

          </div>
        </div>
        <button className="mt-6  text-blue-500 transition-colors hover:text-blue-700" type="submit" onClick={handleSubmit}>
          Sign in
        </button>
        <div className="mt-14">
          <hr />
          <h2 color="gray" className="mt-4 text-center font-normal text-white">
            Don't have an account?{" "}
            <NavLink
              to='/signup'
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign Up
            </NavLink>
          </h2>
        </div>


      </form>
    </div>
  );
}