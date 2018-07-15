const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,  '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
    
const {generateMessage} = require('./utils/message')

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('User Connected.');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined!'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));

        callback('This is from the server!');
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected.');
    });
});

server.listen(port, () => {
    console.log(`Server started on Port: ${port}`);
});

