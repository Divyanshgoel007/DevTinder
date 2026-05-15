const mongoose = require("mongoose")

const validator = require("validator")
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        minLength:3,
        maxLength:50,
        required:true
    },
    lastNmae:{
        type:String,
        minLength:3,
        maxLength:50
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not a valid emailid")
            }
        }
    },
    password:{
        type:String,
        minLength:8,
    },
    age:{
        type:Number,
        min:18
    },
        gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Invalid Gender")
            }
        }
    },
    skills:{
        type:[String]
    },
    about:{
        type:String,
        default:"this is the default section"
    }

},{ 
    timestamps: true 
})

const User = mongoose.model("User",userSchema)


module.exports= User