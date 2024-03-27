import expressAsyncHandler from "express-async-handler";
import { Request,Response } from "express";
import Message from "../models/message";
import { Server, Socket } from "socket.io";
import {io} from "../socket.io/socketIO";

export const getMessage=expressAsyncHandler(async(req:Request,res:Response)=>{
  
})

export const sendMessage = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const { senderId, recepientId, messageText } = req.body;
        const newMessage = new Message({
            senderId,
            recepientId,
            messageText,
        });

        await newMessage.save();

        // Emit a new message event to notify clients
        io.emit('new message', { messageId: newMessage._id, senderId, recepientId, messageText });

        res.status(200).json({ message: "Message sent successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while sending message" });
    }
});


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