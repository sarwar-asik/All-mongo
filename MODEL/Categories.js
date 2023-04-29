const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types


const categorySchemas =- mongoose.Schema({
    name :{
        type:String,
        trim:true,
        required:[true,"Please provide a name"],
        lowercase:true,
        unique:true
    },
    description:String,
    imageURL:{
        type:String,
        validator:[validator.isURL,"Please provide a valid url"]
    }
},{
    timeStamps:true
})

const CategoryModel = mongoose.model("Category",categorySchemas)