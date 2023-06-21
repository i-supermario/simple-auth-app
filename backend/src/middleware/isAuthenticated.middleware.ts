import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import * as dotenv from "dotenv"
import {Request, Response, NextFunction} from 'express';
import User from "../models/userModel"
dotenv.config()

interface JwtPayload {
    userId: string,
    userEmail: string
}


export default function isAuthenticated(req: Request, res: Response, next: NextFunction): Response {
    console.log(req.headers.authorization)
    const authToken = req.headers.authorization
    if(!authToken){
        return res.status(401).json({message: "Unauthorized"})
    }

    const token = authToken.split(" ")[1]
    try{
        const user = jwt.verify(token,process.env.SECRET_KEY) as JwtPayload
        const isUserValid =  User.findOne({_id: user.userId})

        if(!isUserValid){
            return res.status(401).json({message: "This token is invalid"})
        }
        next()
    }
    catch(error){
        return res.status(401).json({message: "This token is invalid",error})
    }
}