import React from 'react';

import ReactEmoji from 'react-emoji';

import "./message.css";

const Message = ({message, name}) => {
    
    let isSentByCurrent = false;

    const trimName = name.trim().toLowerCase();

    let user = message.user;
    let text = message.text;
    
    isSentByCurrent = (trimName === user) ? 1 : 0;

    return (

        isSentByCurrent ? (
            <div className = "messageContainer justifyEnd"> 
                <p className = "sentText pr-10">
                    {trimName}
                </p>
                <div className = "messageBox backgroundBlue">
                    <p className = "messageText colorWhite">
                        {ReactEmoji.emojify(text)}
                    </p>
                </div>
            </div>
        ) 
        
        : (
            <div> 
                <div className = "messageContainer justifyStart"> 
                <div className = "messageBox backgroundLight">
                    <p className = "messageText colorDark">
                        {ReactEmoji.emojify(text)}
                    </p>
                </div>
                <p className = "sentText pl-10">
                        {user}
                </p>
            </div>
            </div>
        )
    )

}; 

export default Message;
