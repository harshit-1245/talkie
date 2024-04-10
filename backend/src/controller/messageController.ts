import expressAsyncHandler from "express-async-handler";
import { Request,Response } from "express";
import Message from "../models/message";




export const getMessage=expressAsyncHandler(async(req:Request,res:Response)=>{
  try {
    const message=await Message.find()
    res.status(200).json(message)
  } catch (error) {
    res.status(500).json({message:"Error"})
  }
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

       
        res.status(200).json({ message: "Message sent successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while sending message" });
    }
});


export const getChat = expressAsyncHandler(async (req:Request, res) => {
    try {
        const { senderId, recipientId } = req.params;

        // Find messages between sender and recipient
        const messages = await Message.find({
            $or: [
                { senderId, recipientId },
                { senderId: recipientId, recipientId: senderId }
            ]
        }).sort({ createdAt: 1 }); // Sort messages by createdAt timestamp

        // Extract only the senderId as a string
        const formattedMessages = messages.map(message => ({
            ...message.toObject(),
            senderId: message.senderId.toString() // Extract senderId as a string
        }));

        res.status(200).json(formattedMessages);
    } catch (error) {
        console.error("Error getting chat:", error);
        res.status(500).json({ message: "Error getting chat" });
    }
});
