import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './database/db';
import userRoute from "./routing/userRoute"
import messageRoute from "./routing/messageRoute"
import Message from './models/message';
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: 'http://192.168.29.163:8081', // Adjust origin as needed
  },
});

// Array to store single chat instances
const singleChat = [];

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log(`${socket.id} user has just connected`);
  
  // Handle "send message" event
  socket.on("send message", async(data) => {
  try {
     console.log("Recieved MEssage",data);
     const {senderId,recepientId,messageText }=data;
     if (!senderId || !recepientId || !messageText) {
      // If any required field is missing, emit an error message back to the client
      socket.emit("send message error", { message: "Missing required fields" });
      return;
    }
      // Save the message into the database
      const newMessage = new Message({
        senderId,
        recepientId,
        messageText,
      });
      await newMessage.save();
  
      // Emit a confirmation message back to the client
      socket.emit("send message success", { message: "Message sent successfully" });
  
  } catch (error) {
    console.error("Error while sending message:", error);
    socket.emit("send message error", { message: "Error while sending message" });
  }
    io.emit("new message", data);
  });

  // Handle "new message" event (received message from other clients)
  socket.on("new message", (data) => {
    console.log("New message received:", data);
    // Handle the received message here, e.g., save it to the database
  });

  singleChat.push(socket);
});

// Connect to the database
connectDB();

// Set up middleware, routes, and other configurations as needed
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",userRoute)
app.use("/",messageRoute)

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
