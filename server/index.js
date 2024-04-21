const express = require('express');
const app = express();
const {createServer } = require('node:http');
const {Server } = require('socket.io');
const cors = require('cors');


app.use(cors());

const server = createServer(app);

const io = new Server(server , {
    cors : {
        origin : "http://localhost:5173",
        methods : ['GET' , 'POST'],
    },
});

io.on('connection' , (socket) =>{
    console.log(`User connected : ${socket.id}`);

    socket.on("join_room" , (data)=>{
        socket.join(data);
    });

    socket.on("send_message" , (data)=>{
        socket.to(data.room).emit('recieve_message' , data);
    });
});

app.listen(3000 , ()=>{
    console.log("server is active");
})
