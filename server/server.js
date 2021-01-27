// Remember all of this hardWork will pay one day keep grinding
// reapedJuggler

let connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};

const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();

const {addUser, removeUser, getUser, getUserInRoom} = require('./users');

// We need to run both of our app and socketio on the same server so we need to create a http server of our own 
const server = http.createServer(app);
const io = socketio(server);

app.use('/', require('./router').route);

// Using Socket.io for real time conversations

io.on('connection', (socket) => {

    console.log('User has joined\n', `socket formed on ${socket.id}`);


    // Admin Generated messages;
    socket.on('join', ({ name, room }, callback) => {

        const {error, user } = addUser ({id: socket.id , name: name, room: room});

        if (error) {
            callback({error: error});
        }

        socket.emit('message', { user: 'admin', text: `Yay! you made it, ${user.name}`});

        socket.broadcast.to(user.room).emit('message', {user: `admin`, text: `Everyone Welcome ${user.name}`});

        socket.join(user.room);

        callback();

    });


    // User generated messages; Then call back to send them back to the client
    socket.on(`sendMessage`, (message, callback) => {

        const user = getUser(socket.id);

        // rn iam guessing that difference between io.emit and socket.emit is that
        // socket.io excludes sender whereas io.to includes sender
        io.to(user.room).emit('message', {user:user.name, text: message});

        callback();
    });

    // A specific instance of a socketIo
    socket.on('disconnect', () => {
        console.log("User has left");
    })
})

const PORT = process.env.PORT || 8000;

//  Now instead of app.listen you'll need server because it is the common point where 
// your server and socket are interacting 
server.listen(PORT, () => console.log("server started on https://localhost:8000"));