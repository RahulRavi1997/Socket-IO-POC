import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import './Chat.css'



let socket;

const Chat = ({location}) => {
    const [ name, setName ] = useState('')
    const [ userid, setUserId ] = useState('')
    const [ room, setRoom ] = useState('')
    const [ users, setUsers] = useState('');
    const [ input, setInput ] = useState('')
    const [ messages, setMessages ] = useState([])

    const ENDPOINT = 'http://localhost:5000'

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setName(name)
        setUserId(socket.id)
        setRoom(room)
        fetch(`${ENDPOINT}/history?room=${room}`).then(res => res.json()).then(history => {
            setMessages([...(history || [])]);
        })

        socket.emit('join', { name, room }, () => {

        });

        return () => {
            socket.emit('disconnect')

            socket.off()
        }
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, [messages])


    const sendMessage = (event) => {
        event.preventDefault();
    
        if(input) {
            socket.emit('sendMessage', input, () => setInput(''))
            fetch(ENDPOINT+"/message", {
                method: "POST",
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({
                    userid: socket.id,
                    name,
                    message: input,
                    room
                })
            })
        }
    }

    return(
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name} />
                <Input message={input} setMessage={setInput} sendMessage={sendMessage} />
            </div>
            
        </div>
    )
    //<TextContainer users={users}/>
}

export default Chat;