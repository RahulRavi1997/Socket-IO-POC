import React from 'react';
import onlineIcon from '../../assets/onlineIcon.png';
import './TextContainer.css';



const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1>Real time Chat Application <span role="img" aria-label="emoji">💬</span></h1>
      <h2>Made with React, Express, Node and Socket.IO <span role="img" aria-label="emoji">❤️</span></h2>
      <h2>Have fun! <span role="img" aria-label="emoji">⬅️</span></h2>
    </div>
    {
      users
        ? (
          <div>
            <h1>Online:</h1>
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

export default TextContainer;