import expressAsyncHandler from "express-async-handler";
import { Request,Response } from "express";
import Status from '../models/status';



export const setStatus=expressAsyncHandler(async(req:Request,res:Response)=>{
    try {
        const {userId,text}=req.body;

         if(!userId || !text){
            res.status(404).json({message:"please login or check status"})
         }
         const status=new Status({
            text:text,
            author:userId
         })

         await status.save()
         res.status(200).json({ message: "Status set successfully" });

    } catch (error) {
        console.log(error);
        res.status(404).json({message:"Something went wrong while set status"})
    }
})

export const getStatus=expressAsyncHandler(async(req:Request,res:Response)=>{

    try {
        const {userId}=req.params
        const status=await Status.find({author:userId}).populate('author')
        res.status(200).json(status);
    } catch (error) {
        console.error('Error getting status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})