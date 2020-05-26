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
    console.log(data)
    let userList = '<li>' + data.users.join('</li><li>') + '</li>';
    usersArea.innerHTML = userList;

    if(data.deletedUser) {
        addDisconnectedMessage(data.deletedUser);
    }
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

//function for adding a message, create a <p> tag and push to chatBox section
function addMessage({newMessage, user}) {
    let newPara = document.createElement('p');
    let text = document.createTextNode(`${user}: ${newMessage}`);
    newPara.appendChild(text);
    chatBox.appendChild(newPara);
    textArea.value = '';
}

//add a message when a user disconnects
function addDisconnectedMessage(user) {
    let newPara = document.createElement('p');
    let message = document.createTextNode(`${user} has disconnected`);
    newPara.appendChild(message);
    chatBox.appendChild(newPara);
}

//show modal for login on page load
$(document).ready(function() {
    $('#modal-user-login').modal('show');
});

function hideModal() {
    $('#modal-user-login').modal('hide');
}