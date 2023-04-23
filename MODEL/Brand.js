const mongoose = require('mongoose')
const validator = require("validator")

const brandSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,'Provide a brand name'],
        maxLength:100,
        unique:true,
        lowercase:true
    },
    description:String,
    email:{
        type:String,
        validator:[validator.isEmail,"Please provide a valid Email"]
    }
})