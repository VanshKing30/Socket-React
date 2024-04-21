const express = require('express');
const {Server} = require("socket.io");
const {CreateServer} = require('http');
const cors  = require("cors");

const PORT = 3000;

const app = express();

const server = CreateServer(app);

const io = new Server (server , {
    cors : {
        origin : "http://localhost:5173",
        methods : ["GET" , "POST"],
        credentials : true,
    },
});


app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    })
  );


io.on("connection" , (socket) =>{
    console.log("User Connected" , socket.id);

    socket.on("message" , ({room , message}) =>{
        console.log({room , message});
        socket.to(room).emit("receive-message" , message);
    });

    socket.on("join-room" , (room) =>{
        socket.join(room);
        console.log(`User joined room ${room}`);
    });

    socket.on("disconnect" , ()=>{
        console.log("User Disconnected" , socket.id);
    });
});

app.listen(port , ()=>{
    console.log(`server is active on port ${port}`);
});







