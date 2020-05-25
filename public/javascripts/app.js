const sendMessageBtn = document.querySelector('.send-btn');
const textArea = document.querySelector('.text-area');
const chatBox = document.querySelector('.chat-box');
const clearBtn = document.querySelector('.clear-btn');
const socket = io();
let username;

//confirm connection of frontend to socket
console.log(socket);

//when add-message message recived from server, trigger addMessage function
socket.on('add-message', function(data) {
    addMessage(data);
});

//event handle for when send message button pressed, send add-message data to server
sendMessageBtn.addEventListener('click', function(evt) {
    socket.emit('add-message', {
        newMessage: textArea.value
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
  
// socket.emit('register-player', initials);
 
//get user's username
function getUsername() {
    var input = prompt("Please enter your username");
    return input ? input : '';
}

//function for adding a message, create a <p> tag and push to chatBox section
function addMessage({newMessage}) {
    let newPara = document.createElement('p');
    let text = document.createTextNode(`${username}: ${newMessage}`)
    newPara.appendChild(text);
    chatBox.appendChild(newPara);
    textArea.value = '';
}