import mongoose, { mongo } from "mongoose";
const messageSchema= new mongoose.Schema({
    senderId:{

    },
    recepientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      messageType: {
        type: String,
        enum: ["text", "image"],
        required: true,
      },
      messageText: {
        type: String,
        default: null, // or an appropriate default value
      },
      imageUrl: {
        type: String,
        default: "",
        required: false, // Make imageUrl optional
      },
},{timestamps:true})

const Message=mongoose.model("Message", messageSchema)

export default Message;