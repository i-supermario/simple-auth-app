import express, {Express,Request,Response} from "express"
import * as dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import dbConnect from "./db/database"
import User from "./db/userModel"
import jwt from "jsonwebtoken"

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
    bcrypt.hash(req.body.password,5)
    .then((hashedPassword)=>{
        console.log(req.body)
        const user = new User({
            email: req.body.email,
            password: hashedPassword
        })
        user.save()
        .then((result)=>{
            res.status(201).send({message: "User saved successfully",result: result})
        })
        .catch((e)=>{
            res.status(500).send({message : "User didn't save successfully",error : e})
        })
    })
    .catch((e)=>{
        res.status(500).send({message : "Password didn't hash successfully",error : e})
    })

})

app.post("/login",(req: Request,res: Response)=>{
    User.findOne({email: req.body.email})
    .then((user)=>{
        bcrypt.compare(req.body.password,user.password)
        .then((check)=>{
            if(!check){
                res.status(400).send({message: "Password is not correct"})
            }
            const token = jwt.sign(
                {
                userId : user._id,
                userEmail : user.email,
            },
            "RANDOM-TOKEN",
            {expiresIn: "24h"}
            )
            res.status(200).send({
                message: "User logged in successfully",
                email: user.email,
                token: token
            })
        })
        .catch((e)=>{
            res.status(400).send({
                message: "Password is not correct",
                error: e
            })
        })

    })
    .catch((e)=>{
        res.send({message:"Email not found",error:e})
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})


module.exports = app

