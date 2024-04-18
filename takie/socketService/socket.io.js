import io from "socket.io-client"

const SOCKET_URL="http://192.168.14.201:4200"

class WSService {
   initializeSocket=async()=>{
       try {
           this.socket=io(SOCKET_URL,{
               transports:["websocket"]
           });

           console.log("Initializing socket...");

           this.socket.on("connect",()=>{
               console.log("Socket connected");
           });

           this.socket.on("disconnect",()=>{
               console.log("Socket disconnected");
           });

           this.socket.on("error",(error)=>{
               console.log("Socket error:", error);
           });
       } catch (error) {
           console.log("Socket is not initialized",error);
       }
   }

   emit(event, data={}){
       this.socket.emit(event, data); // Use emit to send events
   }

   on(event, cb){
       this.socket.on(event, cb); // Use on to add event listeners
   }

   removeListener(eventName){
       this.socket.off(eventName); // Use off to remove event listeners
   }
}

const socketServices = new WSService();

export default socketServices;
