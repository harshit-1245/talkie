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

export const sendFriendRequest = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const { currentUserId, selectedUserId } = req.body;
  
      if (!currentUserId || !selectedUserId) {
        res.status(400).json({ message: 'Both currentUserId and selectedUserId are required' });
        return;
      }
  
      // Check if both currentUserId and selectedUserId exist in the database
      const currentUser = await User.findById(currentUserId);
      const selectedUser = await User.findById(selectedUserId);
  
      if (!currentUser || !selectedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      // Update friendRequest array for the selected user
      await User.findByIdAndUpdate(selectedUserId, {
        $push: { friendRequest: currentUserId },
      });
  
      // Update sendFriendRequest array for the current user
      await User.findByIdAndUpdate(currentUserId, {
        $push: { sendFriendRequest: selectedUserId },
      });
  
      res.status(201).json({ message: 'Friend request sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

export const friendRequest=expressAsyncHandler(async(req:Request,res:Response)=>{
        try{
            const {userId}=req.params;
            //fetch the user from document of UserModel
            const user=await User.findById(userId).populate("friendRequest","username email image").lean();
            const friendRequests = user?.friendRequest;
            res.status(200).json(friendRequests)
            
          } catch (error) {
            res.status(500).json({message:"something went wrong while geeting friend request"})
          } 
    })

    export const acceptRequest = expressAsyncHandler(async (req: Request, res: Response) => {
      try {
        const { senderId, recepientId } = req.body;
        const sender = await User.findById(senderId);
        const recepient = await User.findById(recepientId);
    
        // Update friend arrays for both sender and recipient
        if (sender && recepient) {
          sender.friend.push(recepientId);
          recepient.friend.push(senderId);
    
          recepient.friendRequest = recepient.friendRequest.filter(
            (request) => request.toString() !== senderId.toString()
          );
    
          // Remove sent friend request from sender's sendFriendRequest array after recipient accepts the request
          sender.sendFriendRequest = sender.sendFriendRequest.filter(
            (request) => request.toString() !== recepientId.toString()
          );
    
          await sender.save(); // Save changes to sender
          await recepient.save(); // Save changes to recipient
    
          res.status(200).json({ message: 'Friend request accepted successfully' });
        } else {
          res.status(404).json({ message: 'Sender or recipient not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong while accepting friend request' });
      }
    });

    export const friendDetail = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
      try {
        const {userId}=req.params;
        const user=await User.findById(userId).populate("friend","username email profile")

        const acceptedFriends = await user?.friend;
    res.status(200).json(acceptedFriends)
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong while getting user Detail" });
      }
    })