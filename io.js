const io = require('socket.io')();

io.on('connection', function(socket) {
    console.log('Client is connected')
});

module.exports = io;