const express = require("express")
const validator = require("validator")
const bcrypt = require("bcrypt")
const userAuth = require("../utils/authentication")
const {updatesAllowed} = require("../utils/validation")
const profileRouter= express.Router()

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
    res.send(req.user)
}
    catch(err){
        res.status(404).send(err.message)
    } 
})


profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!updatesAllowed(req)){
            throw new Error("Updates not allowed")
    }

    const loggedInUser=req.user
    Object.keys(req.body).forEach((key)=>{
        loggedInUser[key]=req.body[key]
    })
    await loggedInUser.save();
    res.json({message:`${loggedInUser.firstName}"Profile updated successfully"`,"user":loggedInUser})
}
    catch(err){
        res.status(404).send("Error",err.message)
    }
})

profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user
        const {oldPassword,newPassword} = req.body
        const isPasswordValid = await bcrypt.compare(
            oldPassword,
            loggedInUser.password
        )
        if(!isPasswordValid){
             throw new Error("Password is incorrect")
        }
        if(!validator.isStrongPassword(newPassword)){
            throw new Error("Enter strong password")
        }
        const hashedPassword= await bcrypt.hash(newPassword,10)
            loggedInUser.password = hashedPassword
        await loggedInUser.save()
        res.send("Password updated successfully")
    }
    catch(err){
        res.status(404).send("Error: "+err.message)
    }
})



module.exports = profileRouter