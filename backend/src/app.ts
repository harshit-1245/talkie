import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './database/db';
import userRoute from "./routing/userRoute"
import messageRoute from "./routing/messageRoute"
import Message from './models/message';
import cookieParser from 'cookie-parser';
import statusRoute from "./routing/statusRoute"
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: 'http://192.168.74.201:8081', // Adjust origin as needed
  },
});

// Array to store single chat instances
const singleChat = [];

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log(`${socket.id} user has just connected`);
  
  // Handle "send message" event
  socket.on("send message", async(data) => {
    

  // Handle "get chat" event to retrieve chat messages according to user IDs
  socket.on("get chat", async (data) => {
  })
  });
});

// Connect to the database
connectDB();

// Set up middleware, routes, and other configurations as needed
app.use(express.json());
// Add cookie-parser middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/",userRoute)
app.use("/",messageRoute)
app.use("/",statusRoute)


// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
