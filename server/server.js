const express=require("express");
const http=require("http");
const cors=require("cors");
const {Server}=require("socket.io");
const mongoose=require("mongoose");

const userRoutes=require("./Routes/userRoutes");
const roomRoutes=require("./Routes/roomRoutes");

const app=express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

const server=http.createServer(app);

mongoose.connect(process.env.db_uri,{useNewUrlParser:true,useUnifiedTopology:true,}).then(()=>{
  console.log("database connected");
  server.listen(process.env.PORT,()=>{
    console.log("hey server is listening");
  });

});


app.use("/api/user",userRoutes);
app.use("/api/chat",roomRoutes);


const io=new Server(server,{
    cors:{
      origin:process.env.Origin_URL,
      methods:["GET","POST"]
    }
});


io.on("connection",(socket)=>{


      socket.on("join-room",(roomid)=>{
           socket.join(roomid);
      })

      socket.on("send-msg",(message,currentRoomid)=>{
          socket.to(currentRoomid).emit("receive-msg",message);
      });
      socket.on("disconnect",(roomid)=>{
         socket.leave(roomid);
      });
})