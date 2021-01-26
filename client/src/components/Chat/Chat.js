import React, {useState, useEffect} from 'react'
import queryString from 'query-string'

import {Link} from 'react-router-dom';

import io from 'socket.io-client';

import './chat.css';

let socket;

let connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};


const Chat = ({ location }) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = `localhost:8000`;

    useEffect(() => {
        
        // console.log(location.search.toString(), "\nhere\n");

        const data = (location.search);

        const {name, room} = queryString.parse(location.search);

        socket = io(ENDPOINT, connectionOptions);

        console.log(queryString.parse(location.search), "\n", name, "\n", room, "\n", data, );

        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, (error) => {
            console.log("heloooooooo")
        });

        // console.log(socket);
        
        return (() => {
            socket.emit('disconnect');
            socket.off();
        })

    }, [location.search, ENDPOINT])

    return (
        <div>
            <h1>Chat</h1>
        </div>
    )
}

export default Chat;

// ENDPOINT, location.search