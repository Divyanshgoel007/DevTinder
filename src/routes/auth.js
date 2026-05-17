const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const {validtateSignup}=require("../utils/validation")
const authRouter= express.Router()

authRouter.post("/signup",async(req,res)=>{
        try{
    const{firstName,lastName,email,password}=req.body
    validtateSignup(req)

    const passwordHash = await bcrypt.hash(password,10)
    const user = new User({
        firstName,
        lastName,
        email,
        password:passwordHash
    })

        await user.save()
        res.send("Data successfully saved")
    }catch(err){
        console.log("Data not successfully saved",err)
    }
})

authRouter.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body
        const user = await User.findOne({email:email})

        if(!user){
            throw new Error("Invalid credentials")
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(isPasswordValid){
            const token = await jwt.sign({_id:user._id},"DevTinder",{expiresIn:"3d"})
            res.cookie("Token",token)
            res.send("User Login Successfully")
        }else{
            throw new Error("Invalid credentials")
        }
    }    
    catch(err){
        res.status(404).send(err.message)
    } 
})


authRouter.post("/logout",async(req,res)=>{
    res.cookie("Token",null,{
        expires:new Date(Date.now())
    })
    res.send("User Logged out successfully")
})
module.exports = authRouter