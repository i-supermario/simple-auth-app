import mongoose from "mongoose"

export interface IUser extends mongoose.Document{
    email: string,
    password: string
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
    }
})

const User = mongoose.model<IUser>('User',userSchema)
export default User