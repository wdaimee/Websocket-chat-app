const io = require('socket.io')();

//Object to hold usernames of logged in users
const users = {};

io.on('connection', function(socket) {
    //confirm connection of socket.io on backend
    console.log('Client is connected')

    //when client send's server add-message message, emit add-message message to all clients
    socket.on('add-message', function(data) {
        io.emit('add-message', {
            newMessage: data.newMessage,
            user: users[data.user]
        });
    });

    //Add new users to users object and emit to client side
    socket.on('register-user', function({ username }) {
        users[socket.id] = username;
        io.emit('update-user-list', {
            users: Object.values(users)
        });
    });

    //Listener for when user disconnects from chat
    socket.on('disconnect', function() {
        const deletedUser = users[socket.id];
        delete users[socket.id];
        io.emit('update-user-list', {
            users: Object.values(users),
            deletedUser
        });
    });
});

module.exports = io;