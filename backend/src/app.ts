// Import required modules
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './database/db';
require("dotenv").config()
// Create Express app
// Start the server
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);
connectDB()
// Set up middleware, routes, and other configurations as needed
// For example:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Handle custom events as needed
  // For example:
  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);
    // Broadcast the message to all clients
    io.emit('chat message', msg);
  });
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
