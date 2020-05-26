const sendMessageBtn = document.querySelector('.send-btn');
const textArea = document.querySelector('.text-area');
const chatBox = document.querySelector('.chat-box');
const clearBtn = document.querySelector('.clear-btn');
const usersArea = document.querySelector('.users');
const userAddForm = document.querySelector('.username-form');
const usernameVal = document.querySelector('.username-input');
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
    let userList = '<li>' + data.users.join('</li><li>') + '</li>';
    usersArea.innerHTML = userList;

    if(data.deletedUser) {
        addDisconnectedMessage(data.deletedUser);
    }
})

//event handle for when send message button pressed, send add-message data to server
sendMessageBtn.addEventListener('click', sendMessageToIo);

//event handler for when enter is pressed in text input
textArea.addEventListener('keydown', function(evt) {
    if(evt.keyCode === 13) {
        sendMessageToIo();
    }
})

//event handler for clearing the screen
clearBtn.addEventListener('click', function() {
    chatBox.innerHTML = "";
});

//event handler to get username
userAddForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    username = usernameVal.value;
    console.log(username)
    socket.emit('register-user', {
        username
    });
    hideModal();
});

//function for adding a message, create a bootstrap card and push to chatBox section
function addMessage({newMessage, user, userSocketId}) {
    const newDiv = document.createElement('div');
    const newPara = document.createElement('p');
    const text = document.createTextNode(`${user}: ${newMessage}`);
    newDiv.classList.add('card');
    //if logged in user added the message, apply the current-user-msg class
    if (socket.id === userSocketId) {
        newDiv.classList.add('current-user-msg');
    }
    newPara.appendChild(text);
    newDiv.appendChild(newPara);
    chatBox.appendChild(newDiv);
    textArea.value = '';
}

//add a message when a user disconnects
function addDisconnectedMessage(user) {
    const newPara = document.createElement('p');
    const message = document.createTextNode(`${user} has disconnected`);
    newPara.appendChild(message);
    chatBox.appendChild(newPara);
}

//function to send message to io when keypressed or send btn pressed
function sendMessageToIo() {
    socket.emit('add-message', {
        newMessage: textArea.value,
        user: socket.id
    });
}

//show modal for login on page load
$(document).ready(function() {
    $('#modal-user-login').modal('show');
});

function hideModal() {
    $('#modal-user-login').modal('hide');
}
