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
    //console.log(socket.id)
    //socket.emit("get_id",socket.id)
    socket.on("join_room",(data)=>{
        socket.join(data)
       
            // socket.emit("receive_id",{sign,socket})
    
        
        //if()
      
        //console.log(io.of("/").adapter.rooms.size)
    })
    socket.on("send_message",(data)=>{
        //console.log(data)
        socket.to(data.roomNo).emit("receive_input",data)
        
        })

        if(io.of("/").adapter.rooms.size === 1){
            let sign = {sign: 'X',socket:socket.id,toPlay:true}
            socket.emit("PlayerSign",sign)
        }
    
        if(io.of("/").adapter.rooms.size > 1){
            let sign ={sign: 'O',socket:socket.id,toPlay:false}
            socket.emit("PlayerSign",sign)
        }
        console.log("io:"+io.of("/").adapter.rooms.size)


    socket.on("playerTurn",data =>{
       socket.to(data.roomNo).emit("PlayerTurnReturned",{toPlay:data.toPlay})
    })
    socket.on("disconnect",data=>{
        console.log("User has left:" + socket.id)
    })

    socket.on("Game-Status",data=>{
        if(data.GameResult){
            io.sockets.emit('result',`Player ${data.player} has won`);
        } else if(data.GameResult == false){
            io.sockets.emit('result',`The Game has been squashed!!!`);
        }

        console.log(data)
    })
    })


server.listen(3001,()=>{
    console.log("Server is running")
})

