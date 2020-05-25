const sendMessageBtn = document.querySelector('.send-btn');
const textArea = document.querySelector('.text-area');
const chatBox = document.querySelector('.chat-box');
const clearBtn = document.querySelector('.clear-btn');
const usersArea = document.querySelector('.users');
const socket = io();
let username;

//confirm connection of frontend to socket
console.log(socket);

//when add-message message received from server, trigger addMessage function
socket.on('add-message', function(data) {
    addMessage(data);
});

//Listen for when the users list has changed
socket.on('update-user-list', function(data) {
    console.log(data)
    let userList = '<li>' + data.join('</li><li>') + '</li>';
    usersArea.innerHTML = userList;
})

//event handle for when send message button pressed, send add-message data to server
sendMessageBtn.addEventListener('click', function(evt) {
    socket.emit('add-message', {
        newMessage: textArea.value,
        user: socket.id
    });
});

//event handler for clearing the screen
clearBtn.addEventListener('click', function() {
    chatBox.innerHTML = "";
});

//prompt user for username
do {
    username = getUsername();
}   while (username.length < 2);
socket.emit('register-user', username);
 
//get user's username
function getUsername() {
    var input = prompt("Please enter your username");
    return input ? input : '';
}

//function for adding a message, create a <p> tag and push to chatBox section
function addMessage({newMessage, user}) {
    let newPara = document.createElement('p');
    let text = document.createTextNode(`${user}: ${newMessage}`)
    newPara.appendChild(text);
    chatBox.appendChild(newPara);
    textArea.value = '';
}