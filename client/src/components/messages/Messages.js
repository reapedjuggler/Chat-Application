import React from 'react';

import ScrolltoBottom from 'react-scroll-to-bottom';

import './messages.css';

import Message from '../message/Message';

// What we'll do here is just render our messages array and send each message as a differnt 
// component with the user who sent it

const Messages = ({messages, name}) => {

    console.log(...messages, "  ",name, "  ", messages);

    return (
        <ScrolltoBottom>
        <div>

            {/* Render messages as different components */}

            {
                messages.map((message, index) => <div key = {index}> <Message message = {message} name = {name} /> </div>)
            }

        </div>
        </ScrolltoBottom>
    )
};

export default Messages;