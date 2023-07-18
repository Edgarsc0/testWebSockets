import express from "express"
import http from "http"
import {Server as SocketIoServer} from "socket.io"
import cors from "cors"
import pako from "pako"

const app = express();
const server = http.createServer(app);
const io=new SocketIoServer(server,{
    cors:{
        origin:"*"
    }
});

app.use(cors());

io.on("connection",(socket)=>{
    console.log("usuario conectado",socket.id);
    socket.on("mensaje",data=>{
        console.log("mensaje recibido");
        console.log(socket.id+" dice: ");
        console.log(data);
        //const uncompressedData=pako.inflate(data,{to:"string"});
        //console.log(uncompressedData);
    });
    socket.on("disconnect",()=>{
        console.log("usuario desconectado",socket.id);
    })
})

const port=3000||process.env.port;
server.listen(port,()=>{
    console.log("server on port "+port);
})