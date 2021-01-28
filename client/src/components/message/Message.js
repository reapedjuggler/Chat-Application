import React from 'react'

const Message = ({message, name}) => {
    
    let isSentByCurrent = false;

    const trimName = name.trim().ToLowerCase();

    isSentByCurrent = (trimName === user) ? 1 : 0;

    return (

        isSentByCurrent ? (
            <div className = "messageContainer"> 

            </div>
        ) 
        
        : (
            <div> 

            </div>
        )
    )

}

export default Message;
