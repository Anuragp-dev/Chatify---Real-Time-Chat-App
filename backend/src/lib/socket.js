import { Server } from "socket.io";
import http from "http";
import express from "express";



const app = express()
const server = http.createServer(app)

// socket io server connection
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
    }
})



export { io, server, app }