var socket = io();
        
socket.on('connect', function () {
    console.log('Server Connected.');

    socket.emit('createMessage', {
        from: 'Andrew',
        text: 'Yup. That works for me.'
    });
});

socket.on('disconnect', function () {
    console.log('Server Disconnected.');
});

socket.on('newMessage', function (message){
    console.log('New Message', message);
});