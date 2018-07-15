var socket = io();
        
socket.on('connect', function () {
    console.log('Server Connected.');
});

socket.on('disconnect', function () {
    console.log('Server Disconnected.');
});

socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi'
}, function(data){
    console.log('Got it!', data);
});

socket.on('newMessage', function (message){
    console.log('New Message', message);
});