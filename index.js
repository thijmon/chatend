const path = require('path')
const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Models = require('./db/models.js')
const Message = Models.Message
require('./db/config.js')
const port = 3000;

app.use('/static', express.static('public'))
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/username.html');
});

app.get('/javascript', (req, res) => {
    res.sendFile(__dirname + '/public/javascript.html');
});

app.get('/swift', (req, res) => {
    res.sendFile(__dirname + '/public/swift.html');
});

app.get('/css', (req, res) => {
    res.sendFile(__dirname + '/public/css.html');
});

// tech namespace
const tech = io.of('/tech');

tech.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        tech.in(data.room).emit('message', `New user joined ${data.room} room!`);
        const messages = Message.find({ 'room': data.room }).then(res => {
            res.forEach(item => tech.in(data.room).emit('message', item))
        })


    })

    socket.on('message', (data) => {
        console.log(`message: ${data.msg}`, `username: ${data.username}`);

        const message = new Message({ message: data.msg, username: data.username, room: data.room })
        message.save()
        tech.in(data.room).emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');

        tech.emit('message', 'user disconnected');
    })
})
