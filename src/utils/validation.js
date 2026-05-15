const validator = require("validator")

const validtateSignup=((req)=>{
    const{firstName,lastName,email,password}=req.body
    if(!firstName|| !lastName){
        throw new Error("Enter the Name")
    }
    else if(!validator.isEmail(email)){
        throw new Error("Enter the valid email")
    }
    else if(!validator.isStrongPassword(password)){
         throw new Error("Enter the strong password")
    }
})
module.exports={validtateSignup}  