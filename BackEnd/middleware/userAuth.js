const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userAuth = (req,res,next)=>{
   
  const { authorization} = req.headers
  if(!authorization){
    res.status(StatusCodes.BAD_REQUEST).json('No token provided')
    return
  }

 const  token = authorization.split(' ')[1]
  if(!token){
    res.status(StatusCodes.BAD_REQUEST).json('No token provided')
    return
  }
const  decoded = jwt.verify(token,process.env.JWT_PRIVATE_KEY)


if(!decoded){
    res.status(StatusCodes.BAD_REQUEST).json('unauthorized')
    return
}

req.user = decoded
next()
}

module.exports = {userAuth}