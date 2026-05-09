const server = require("express")
const app = server()


app.use("/hello",(req,res)=>{
    res.send("hello ")
})

app.use("/namaste",(req,res)=>{
    res.send("namaste")
})

app.use("/",(req,res)=>{
    res.send("Hello ")
})

app.listen(2211,()=>{
    console.log("Server is running perfectly")
})