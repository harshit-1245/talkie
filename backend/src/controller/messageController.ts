import expressAsyncHandler from "express-async-handler";
import { Request,Response } from "express";
import Message from "../models/message";

export const getMessage=expressAsyncHandler(async(req:Request,res:Response)=>{
  
})

export const sendMessage=expressAsyncHandler(async(req:Request,res:Response)=>{

})

export const getChat=expressAsyncHandler(async(req:Request,res:Response)=>{
    
    try {
        const {senderId,recepientId}=req.params;
        const messages=await Message.find({
            $or:[
                {senderId:senderId,recepientId:recepientId},
                {senderId:recepientId,recepientId:senderId},
            ],
        }).populate("senderId","_id username")

        res.status(200).json(messages)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error while getting chat"})
    }
})