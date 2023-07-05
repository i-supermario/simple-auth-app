import express, {Express,Request,Response} from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import dbConnect from "./config/database"
import User from "./models/userModel"
import jwt from "jsonwebtoken"
import isAuthenticated from "./middleware/isAuthenticated.middleware"

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

app.get("/check",isAuthenticated,(req: Request,res: Response)=>{
    
    res.json({message: "Check"})
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
                    res.status(201).send({message: "User saved successfully",user: result})
                })
                .catch((e)=>{
                    res.status(500).send({message : "User didn't save successfully",error : e})
                })
            })
            .catch((e)=>{
                res.status(500).send({message : "Password didn't hash successfully",error : e})
            })
        }
        else{
            res.status(201).send({message: "User already exists"})
        }
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
            process.env.SECRET_KEY,
            {expiresIn: "24h"}
            )
            res.status(200).send({
                message: "User logged in successfully",
                user: user,
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

