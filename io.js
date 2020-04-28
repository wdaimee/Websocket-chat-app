const io = require('socket.io')();

io.on('connection', function(socket) {
    console.log('Client is connected')
    socket.on('add-message', function(data) {
        io.emit('add-message', data);
    });
});

module.exports = io;