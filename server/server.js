const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const socketIo = socketio(server);

app.use ('/', require('./router').route);

// Using Socket.io for real time conversations

socketIo.on ('connection', (socket) => {

    console.log('User has joined');

    // A specific instance of a socketIo
    socket.on('disconnect', () => {
        console.log("User has left");
    })
})

const PORT = process.env.PORT || 8000;
app.listen (PORT, () => console.log("server started on https://localhost:8000"));