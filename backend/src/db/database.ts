import * as dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()

export default async function databaseConnect(){
    
    mongoose.connect(process.env.DATABASE_URL,{
        serverSelectionTimeoutMS: 5000,
        autoIndex : true,
    })
    .then(
        ()=>{
            console.log("Connected Successfully")
        }
    )
    .catch((error)=>{
        console.log("Could not connect")
        console.error(error)
    })



}
