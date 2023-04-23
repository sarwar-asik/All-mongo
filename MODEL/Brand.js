const mongoose = require('mongoose')
const validator = require("validator")
const { ObjectId } = mongoose.Schema.Types

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
    },
    website:{
        type:String,
        validator:[validator.isURL,"Please provide a valid Number"]
    },
    products:[{
        name:String,
        contactNumber:String,
        id:{
            type:ObjectId,
            ref:"Supplier"
        }
    }],
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    }
},
{
    timestamps:true
})

const Brand = mongoose.model('Brand',brandSchema)

export default Brand