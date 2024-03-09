import expressAsyncHandler from "express-async-handler";
import { Request,Response } from "express";
import User from "../models/user";


export const getUser=expressAsyncHandler(async(req:Request,res:Response)=>{
    try {
        const user=await User.find()
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message:"Something went wrong while getting User"})
    }
})