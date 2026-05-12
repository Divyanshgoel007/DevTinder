const server = require("express")
const app = server()
const connectDB = require("./config/database")


const User = require("./models/User")


app.post("/signup",async(req,res)=>{
    const user = new User({
        firstName:"noni",
        lastName:"Goel",
        email:"goeldivyansh@gmail.com",
        password:"divyans@123",
        age:19
    })
    try{
        await user.save()
        res.send("Connected")
    }catch(err){
        console.log("Data not successfully saved",err)
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