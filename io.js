const io = require('socket.io')();

io.on('connection', function(socket) {
    //confirm connection of socket.io on backend
    console.log('Client is connected')

    //when client send's server add-message message, emit add-message message to all clients
    socket.on('add-message', function(data) {
        io.emit('add-message', data);
    });
});

module.exports = io;