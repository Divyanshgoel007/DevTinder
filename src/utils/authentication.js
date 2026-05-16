const jwt = require("jsonwebtoken")
const User = require("../models/User")

const userAuth=async(req,res,next)=>{
    try{
const cookie = req.cookies
const {Token} = cookie;
if(!Token){
    throw new Error("Not valid token")
}
const decodedObj = await jwt.verify(Token,"DevTinder")
const {_id}=decodedObj
const user = await User.findById(_id)
if(!user){
    throw new Error("User not found")
}
req.user=user
next()
}
catch(err){
    res.status(404).send("Error"+err.message)
}
}
module.exports=userAuth