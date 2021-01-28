import React from 'react';

import onlineIcon from '../../icons/onLineIcon.png';

import './content.css';

const Content = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1>ChatFaast <span role="img" aria-label="emoji">💬</span></h1>
      <h2>Made with <span role="img" aria-label="emoji">❤️</span> by reapedJuggler</h2>
      {/* <h2>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h2> */}
    </div>
    {
      users
        ? (
          <div>
            <h1>People currently Active</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default Content;
