import mongoose from "mongoose"

export interface UserI extends mongoose.Document{
    email: string,
    password: string,
    name?: string,
    mobile?: string,
    bio?: string,
    imageurl?: string
};


const userSchema = new mongoose.Schema({
    email: {
        type : String,
        required : [true,"Please provide an email"],
        unique : [true, "Email exists"]
    },
    password: {
        type: String,
        required : [true, "Please provide a password"],
        unique : false
    },
    name:{
        type: String,
        required : false,
    },
    mobile:{
        type: String,
        required : false,
    },
    bio:{
        type: String,
        required : false,
    },
    imageurl:{
        type: String,
        default: "backend\src\media\favicon.ico",
        required : false,
    },



})

export const User = mongoose.model<UserI>('User',userSchema)
