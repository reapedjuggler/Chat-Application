const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();

// We need to run both of our app and socketio on the same server so we need to create a http server of our own 
const server = http.createServer(app);
const io = socketio(server);

app.use('/', require('./router').route);

// Using Socket.io for real time conversations

// Stuff from stack over flow 
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "https://www.differentServerDomain.fr https://www.differentServerDomain.fr");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
 
io.on('connection', (socket) => {

    console.log('User has joined\n', `socket formed on ${socket.id}`);

    socket.on('join', ({ name, room }) => {
        console.log(name, room);
    })

    // A specific instance of a socketIo
    socket.on('disconnect', () => {
        console.log("User has left");
    })
})

const PORT = process.env.PORT || 8000;

//  Now instead of app.listen you'll need server because it is the common point where 
// your server and socket are interacting 
server.listen(PORT, () => console.log("server started on https://localhost:8000"));