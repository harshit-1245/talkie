import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './database/db';
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
  // You can perform any necessary logic here upon connection
  
  // For example, you can add the socket to singleChat array:
  singleChat.push(socket);
});

// Connect to the database
connectDB();

// Set up middleware, routes, and other configurations as needed
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
