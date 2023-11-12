const express  = require('express');
const cors = require('cors')
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server,{cors:{
    origin:'http://localhost:3000'
}});

app.use(cors())


io.on('connection',(socket)=>{
    //socket.emit("get_id",socket.id)
    socket.on("join_room",(data)=>{
        socket.join(data)
        socket.emit("receive_id",socket.id)
    })
    socket.on("send_message",(data)=>{
        console.log(data)
        socket.to(data.roomNo).emit("receive_input",data)
        
        })
    })


server.listen(3001,()=>{
    console.log("Server is running")
})

