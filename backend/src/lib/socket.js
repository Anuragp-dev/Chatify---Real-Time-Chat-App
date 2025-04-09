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


// get the socket id with the user id receiver socket id
export const getReceiverSocketId = (userId) => {

    userSocketMap[userId]
}


// store online users in this
const userSocketMap = {}



io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    // passing user id 
    const userId = socket.handshake.query.userId

    // set the user id to the socket
    if (userId) {
        userSocketMap[userId] = socket.id
    }

    // io.emit is used to send event to all connected users
    io.emit('getOnlineUsers', Object.keys(userSocketMap))

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);

        // delete the user id from the map if become offline
        delete userSocketMap[userId]
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
})



export { io, server, app }