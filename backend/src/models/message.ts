import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming you have a User model and you want to reference it
        required: true
    },
    recepientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming you have a User model and you want to reference it
        required: true
    },
    messageType: {
        type: String,
        enum: ["text", "image"],
        required: true
    },
    messageText: {
        type: String,
        default: null // or an appropriate default value
    },
    imageUrl: {
        type: String,
        default: "",
        required: false // Make imageUrl optional
    },
    read: {
        type: Boolean,
        default: false // Message is initially unread
    }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);

export default Message;
