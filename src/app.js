const server = require("express")
const app = server()
const connectDB = require("./config/database")
const cookieparser=require("cookie-parser")


//Routes
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
//const requestRouter = require("./routes/request")



app.use(server.json())
app.use(cookieparser())


app.use("/",authRouter)
app.use("/",profileRouter)

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