import React from 'react';

import closeIcon from '../../icons/close.png'
import onlineIcon from '../../icons/onLineIcon.png'
import "./infoBar.css"

const InfoBar = ({room}) => {
    return (
        <div className="infoBar">

            <div className="leftInnerContainer">
                <img src = {onlineIcon} className = "onlineIcon"/>
                <h3>{room}</h3>
            </div>

            <div className="rightInnerContainer">
                <a href = "/">
                <img src = {closeIcon} className = "closeIcon"/>
                </a>
            </div>

        </div>   
        
    )
};

export default InfoBar;
