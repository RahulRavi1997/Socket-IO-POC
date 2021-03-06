const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')

const {addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');
const { addMessage, getMessages, clearChat } = require('./messages.js');

const PORT = process.env.PORT || 5000

const router = require('./router');
const { isObject } = require('util');

const app = express() 
const server = http.createServer(app)
const io = socketio(server);

app.use(router)
app.use(cors())
app.use(express.json())


io.on('connection', (socket) => {
    socket.on('join', ({ name, room}, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return callback(error)

        const text = `${user.name} joined`;
        socket.broadcast.to(user.room).emit('message', { isActivityMessage: true, text })
        addMessage({ userid:socket.id, room: user.room, message: text, isActivityMessage: true });

        socket.join(user.room)

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)})

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('message', { user: user.name, text: message })
        io.to(user.room).emit('roomData', { room:user.room, users: getUsersInRoom(user.room)})

        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if(user){
            const text = `${user.name} left`;
            io.to(user.room).emit('message', { isActivityMessage: true, text })
            addMessage({ userid:socket.id, room: user.room, message: text , isActivityMessage: true});
        }
    })
})

app.get('/history', (req, res) => {
    res.json(getMessages(req.query.room))
})
app.post('/message', (req, res) => {
    res.json(addMessage(req.body))
})

server.listen(PORT, ()=> console.log(`Server is up at ${PORT}`))