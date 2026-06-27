const mongoose = require('mongoose')

const foodPatnerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

const foodPatnerModel = mongoose.model('foodpatner', foodPatnerSchema)
module.exports = foodPatnerModel