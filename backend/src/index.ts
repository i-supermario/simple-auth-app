import express, {Express,Request,Response} from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import dbConnect from "./config/database"
import { User,UserI } from "./models/userModel"
import isAuthenticated from "./middleware/isAuthenticated.middleware"
import generateToken from "./middleware/generateToken"

dotenv.config()

const app: Express = express()
dbConnect()


app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(express.json());

app.get("/",( req : Request ,res : Response)=>{
    res.send({ message: "Working"})
    console.log("Working")
})


app.post("/register",(req : Request,res : Response)=>{
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user){
            bcrypt.hash(req.body.password,5)
            .then((hashedPassword)=>{
                const user = new User({
                    email: req.body.email,
                    password: hashedPassword
                })
                user.save()
                .then((result)=>{
                    
                    const token = generateToken(user._id,user.email)
                    return res.status(201).send({message: "User saved successfully",user: result,token: token})
                })
                .catch((e)=>{
                    return res.status(500).send({message : "User didn't save successfully",error : e})
                })
            })
            .catch((e)=>{
                return res.status(500).send({message : "Password didn't hash successfully",error : e})
            })
        }
        else{
            return res.status(201).send({message: "User already exists"})
        }
    })
    
    

})

app.post("/login",(req: Request,res: Response)=>{
    User.findOne({email: req.body.email})
    .then((user)=>{
        bcrypt.compare(req.body.password,user.password)
        .then((check)=>{
            if(!check){
                return res.status(400).send({message: "Password is not correct"})
            }
            const token = generateToken(user._id,user.email)
            return res.status(200).send({
                message: "User logged in successfully",
                user: user,
                token: token
            })
        })
        .catch((e)=>{
            return res.status(400).send({
                message: "Password is not correct",
                error: e
            })
        })

    })
    .catch((e)=>{
        return res.send({message:"Email not found",error:e})
    })
})

app.put("/update",isAuthenticated,(req: Request,res: Response)=>{
    const updatedUser = req.body as UserI
    User.findOne({email: updatedUser.email})
    .then(user => {
        if(user){
            if(updatedUser.name){
                user.name = updatedUser.name
            }
            if(updatedUser.bio){
                user.bio = updatedUser.bio
            }
            if(updatedUser.mobile){
                user.mobile = updatedUser.mobile
            }
            if(updatedUser.password){
                bcrypt.hash(updatedUser.password,5)
                .then(hashedPass=>{
                    user.password = hashedPass
                })
            }
            user.save()
            return res.status(200).json({message: "User updated Successfully"})
        }
        else{
            return res.status(400).send({message: "User not found"})
        }
    })
    .catch(e => {
        return res.status(400).json({message:"User not found"})
    })
    
})

app.put("/changepassword",isAuthenticated,(req: Request,res: Response)=>{
    User.findOne({email: req.body.email})
    .then(user => {
        bcrypt.compare(req.body.currentpassword,user.password)
        .then(check => {
            if(check){
                bcrypt.hash(req.body.newpassword,5)
                .then(hashed => {
                    user.password = hashed
                    user.save()
                    .then( () => {
                        res.status(200).send({message: "Password updated successfully"})
                    })
                })
                .catch(e => {
                    res.status(400).send({message: "Could not encrypt password",e})
                })
            }
            else{
                res.status(400).send({message: "Hash check failed"})
            }
        })
        .catch(e => {
            res.status(400).send({message: "Password doesn't match",e})
        })
    })
    .catch(e => {
        res.status(400).send({message: "User not found",e})
    })
})

app.get("/get/:email",(req: Request, res: Response)=>{
    const email = req.params.email
    User.findOne({email: email})
    .then(user => {
        res.status(200).json({message: "Retrieved data successfully", user: user})
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})


module.exports = app

