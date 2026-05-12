const database=require("mongoose")

const connectDB=async()=>{
    await database.connect("mongodb+srv://NodeJs:HR10DG0001@nodejs.yxbfuhy.mongodb.net/devTinder")

}
module.exports = connectDB;