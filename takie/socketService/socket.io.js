import io from "socket.io-client"

const SOCKET_URL="http://192.168.29.163:4200"

class WSService {
   initializeSocket=async()=>{
   try {
     this.socket=io(SOCKET_URL,{
         transports:["websocket"]
     })
     console.log("initializing socket",this.socket);
 
    this.socket.on("coonect",(data)=>{
     console.log("=== socket connected ===");
    })
 
    this.socket.on("disconnect",(data)=>{
     console.log("=== socket disconnected ===");
    })
 
    this.socket.on("error",(data)=>{
     console.log("socket error",data);
    })
   } catch (error) {
    console.log("Socket is not initialized",error);
   }


   }
   emit(event,data={}){
    this.socket.on(event,data)
   }

   on(event,cb){
    this.socket.on(event,cb)
   }

   removeListener(listnerName){
    this.socket.removeListener(listnerName)
   }
}

const socketServices=new WSService()

export default socketServices;