import React from 'react';

import closeIcon from '../../icons/close.png'
import onlineIcon from '../../icons/onLineIcon.png'

const InfoBar = () => {
    return (
        <div className="infoBar">

            <div className="leftInnerContainer">
                <img src = {onlineIcon} />
            </div>

            <div className="rightInnerContainer">
                <a href = "/" />
                <img src = {closeIcon} />
            </div>


        </div>   
        
    )
};

export default InfoBar;
