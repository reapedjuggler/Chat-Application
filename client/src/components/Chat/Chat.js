import React, {useState, useEffect} from 'react'
import queryString from 'query-string'

import {Link} from 'react-router-dom';

import io from 'socket.io-client';

import './chat.css';
import InfoBar from  '../infoBar/InfoBar'
import Input from  '../input/Input'
import Messages from '../messages/Messages'
import RoomContent from '../Content/Content'

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
    const [users, setUsers] = useState([]);
    const ENDPOINT = `https://react-chat-application-me.herokuapp.com/`;

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

        return (() => {
            socket.emit('disconnected');
            socket.off();
        })

    }, [location.search, ENDPOINT]);


    useEffect (() => {

        socket.on('message', (message) => {
            console.log(message.user, "  iam message\n");
            setMessages([...messages, message]);
        });

        // console.log(message.user, " and " , messages);

        socket.on('roomData', ({users}) => {
            console.log(users, "  iam user\n");
            setUsers(users);
        });


    }, [messages, users]);

    // useEffect (() => {


    //     // console.log(message.user, " and " , messages);

    // }, [users]);


    // Function for sending messages 
    const sendMessage = (event) => {

        event.preventDefault();

        // When message is sent clear it so that message is again refreshed to a new one
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(``)); 
        }

    }

    return (

        <div className = "outerContainer">
            <div className = "container">
                <InfoBar room = {room} />
                <Messages messages = {messages} name = {name} />
                <Input message = {message} setMessage = {setMessage} sendMessage = {sendMessage}/>
            </div>
            <RoomContent users = {users} />
        </div>
    )
}

export default Chat;

// ENDPOINT, location.search