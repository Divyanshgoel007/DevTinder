const server = require("express")
const app = server()



app.post("/user",(req,res)=>{
    res.send("Yes that's done")
})

app.delete("/user",(req,res)=>{    
    res.send("Yes that's done")
})


app.patch(/^\/us?er$/,(req,res)=>{    // here if we will write user or uer it will work s is optional   this is used by  regx here if we add + so kitne bi s laga sakte hai 
    res.send("Yes that's done")
})


app.get("/user",(req,res)=>{
    console.log(req.query)
    res.send("Yes that's done")
})


// app.get("/user/:ID/:name/:password",(req,res)=>{
//     console.log(req.params)
//     res.send("Yes that's done")
// })


//use saari http API ko access karta hai isliye hume alg alg http request send karni hoti hai
app.use("/hello",(req,res)=>{
    res.send("hello ")
})


app.listen(2211,()=>{
    console.log("Server is running perfectly")
})