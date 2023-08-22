const mongoose = require('mongoose')
const joi = require('joi')



const artistSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
    },
    description:{
       type:String
    },
    albums:{
        type:Array
    },
    img:{
        type: String
    }

},{timestamps:true})

const Artist = mongoose.model("artists",artistSchema)

const artistValidation = (artist)=>{
    const Schema = joi.object({
       name:joi.string().required(),
       description :joi.string().required(),
       albums:joi.array(),
       img:joi.string().required()

    })
    return Schema.validate(artist)
}

module.exports = {Artist,artistValidation}