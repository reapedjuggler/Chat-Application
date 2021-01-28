import React from 'react';

import './input.css';

const Input = ({message, setMessage, sendMessage}) => {
    return (
        <form clssName = "form">

            <input 
            type = "text"
            className = "input"
            placeholder = "Start typing ..."
            value = {message} 
            onChange = {(event) => setMessage(event.target.value)}
            onKeyPress = {event => (event.key === 'Enter' ? sendMessage(event): null)}
            />

            <button className="sendButton"onClick = {(e) => (sendMessage(e))}> Send </button>

        </form>
    )
}; 

export default Input;