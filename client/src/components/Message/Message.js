import React from 'react';
import ReactEmoji from 'react-emoji';
import './Message.css';



const Message = ({message: { user, text, isActivityMessage }, name }) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim();
    if(user === trimmedName){
        isSentByCurrentUser = true;
    }
    
    return (
    isActivityMessage ? (
        <div className="statusMessage">
          <p>{text}</p>
        </div>
    ) : (
      <div
        className={"messageContainer " + (isSentByCurrentUser? "justifyEnd": "justfifyStart")}>
        <p className="sentText pr-10">
          {isSentByCurrentUser ? "You" : user}
        </p>
        <div className={"messageBox " + (isSentByCurrentUser? "backgroundBlue": "backgroundLight")}>
          <p className={"messageText " + (isSentByCurrentUser ? "colorWhite" : "colorDark")}>
            {ReactEmoji.emojify(text)}
          </p>
        </div>
      </div>
    )
    )
}

export default Message;