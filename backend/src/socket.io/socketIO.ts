import express from "express"
import http from "http"
import {Server,Socket} from "socket.io"

// server using Node's HTTP module
const server = http.createServer();

// Socket.IO instance by passing the server instance
const io = new Server(server);

// Socket.IO logic
io.on("connection",(socket:Socket)=>{
    console.log('A user connected');

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
})
})



export default server;