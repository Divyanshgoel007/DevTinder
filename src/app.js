const server = require("express")
const app = server()
const connectDB = require("./config/database")


const User = require("./models/User")

app.use(server.json())

//signup request
app.post("/signup",async(req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        res.send("Data successfully saved")
    }catch(err){
        console.log("Data not successfully saved",err)
    }
})

//finding user by there emailId
app.get("/users",async(req,res)=>{
    const users = req.body.email;
    try{
        const user = await User.find({email:users})
        if(user.length===0){
            res.send("cannot find user")
        }else{
            res.send(user)
        }
    }
    catch(err){
        res.status(400).send("Something Went Wrong")
    }
    
})

// finding all the users by route feed
app.get("/feed",async(req,res)=>{
    try{
        const user = await User.find({})
        if(user.length===0){
            res.send("cannot find user")
        }else{
            res.send(user)
        }
    }
    catch(err){
        res.status(404).send("Something Went Wrong")
    }    
})

//deleting a user
app.delete("/delete",async(req,res)=>{
    const userId=req.body.userId
    try{
        const user = await User.findByIdAndDelete({_id:userId})
        res.send("user deleted successfully")
    }
    catch(err){
        res.status(404).send("Something Went Wrong")
    }     
})

//updating the user
app.patch("/update", async (req, res) => {
    try {
        const userId = req.body.userId
        const data = req.body
        const ALLOWED_UPDATES = [
            "age",
            "skills",
            "gender",
            "about",
            "password"
        ]
        const updates = Object.keys(data).filter(
            (k) => k !== "userId"
        )
        const isAllowed = updates.every((k) =>
            ALLOWED_UPDATES.includes(k)
        )
        if (!isAllowed) {
            return res.status(400).send("Update not allowed")
        }
        const user = await User.findByIdAndUpdate(
            userId,
            data,
            {
                new: true,
                runValidators: true
            }
        )
        if (!user) {
            return res.status(404).send("User not found")
        }
        res.send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
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