const mongoose = require('mongoose')
const joi = require('joi')

const songSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    artist:{
        type:String,
        default:'unKnown'
    },
    url:{
        type:String,
        required:true
    }

},{timestamps:true})


const songValidate = (song)=>{
  const Schema = joi.object({
    name:joi.string().required(),
    img:joi.string().required(),
    url:joi.string().required(),
    artist:joi.string().required()
  })

  return Schema.validate(song)
}


const Song = mongoose.model('Song',songSchema)

module.exports = {Song,songValidate}