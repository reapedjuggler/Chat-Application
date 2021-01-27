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
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
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
            console.log("heloooooooo");
        });

        // console.log(socket);
        
        return (() => {
            socket.emit('disconnected');
            socket.off();
        })

    }, [location.search, ENDPOINT]);


    useEffect (() => {
        console.log("  obtio\n\n ");
        
        socket.on('message', (message) => {
            console.log(message, "  iam message\n");
            setMessages([...messages, message]);
        });

        console.log(message, " and " , messages);

    }, [messages]);

    // Function for sending messages 
    const sendMessage = (event) => {

        event.preventDefault();

        // When message is sent clear it so that message is again refreshed to a new one
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(``)); 
        }

    }

    return (
        <div>
            <h1>Chat</h1>
            <div className = "outerContainer">
                <div className = "innerContainer">
                    <input value = {message} onChange = {(event) => setMessage(event.target.value)}
                        onKeyPress = {event => (event.key === 'Enter' ? sendMessage(event): null)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Chat;

// ENDPOINT, location.search