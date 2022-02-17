import React from 'react';
import { Trash2, X } from 'react-feather';
import { Link } from 'react-router-dom';
import onlineIcon from '../../assets/onlineIcon.png';
import './InfoBar.css';


const InfoBar = ( {room, clearChat} ) => (

    <div className="infoBar">
        <div className="leftInnerContainer">
            <img src={onlineIcon} alt="online" className="onlineIcon"/>
            <h3>{room}</h3>
        </div>

        <div className="rightInnerContainer">
            <Link to="/">
                <X color='white' size={20} />
            </Link>
            <div className="clearChat">
                <Trash2 color='white' size={20} onClick={clearChat}/>
            </div>
        </div>
    </div>
    )


export default InfoBar;