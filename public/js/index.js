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
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $("#messages").append(li);
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('#msgId').val()
    }, function(){

    });
});

var locationButton = $('#send-location');
locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Gelocation Not Supported!');
    }

    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
    }, function () {
        alert('Unable to fetch Location!');
    });
})