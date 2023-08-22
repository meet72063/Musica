require('dotenv').config()
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')



const adminAuth = (req,res,next)=>{
 
const {authorization} = req.headers
const  token = authorization.split(' ')[1]


if(!token){
  res.status(StatusCodes.BAD_REQUEST).json({error:'No token provided,plz login again'})
  return
}
const  decoded = jwt.verify(token,process.env.JWT_PRIVATE_KEY)

if(!decoded){
    res.status(StatusCodes.BAD_REQUEST).json({error:'unauthorized'})
    return
}



const {isAdmin} = decoded

 if(!isAdmin){
    res.status(StatusCodes.UNAUTHORIZED).json({error:'you are not authorized to use this route'})
    return
 }

req.user =decoded
next()


}

module.exports = adminAuth