const server = require("express")
const app = server()
const connectDB = require("./config/database")
const bcrypt = require("bcrypt")
const cookieparser=require("cookie-parser")
const jwt = require("jsonwebtoken")
const User = require("./models/User")
const {validtateSignup}=require("./utils/validation")
const userAuth = require("./utils/authentication")
app.use(server.json())
app.use(cookieparser())


//signup request
app.post("/signup",async(req,res)=>{
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


app.post("/login",async(req,res)=>{
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


app.get("/profile",userAuth,async(req,res)=>{
    try{
    res.send(req.user)
}
    catch(err){
        res.status(404).send(err.message)
    } 
})


connectDB()
.then(()=>{
    console.log("Database connected successfully")
})
.catch((err)=>{
    console.error("Database connection failed")
})

app.listen(2211,()=>{
    console.log("Server is running perfectly")
})