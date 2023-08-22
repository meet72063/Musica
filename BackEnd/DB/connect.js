const mongoose = require('mongoose')


 const connect =async (uri)=>{
    try {
        await   mongoose.connect(uri,{
    useNewUrlParser:true
})
   console.log('connected to database')
    } catch (error) {
        console.log(error)
    }  
  

 }
 
 

module.exports = connect