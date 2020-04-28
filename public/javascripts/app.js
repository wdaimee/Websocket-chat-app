const sendMessageBtn = document.querySelector('.send-btn');
const textArea = document.querySelector('.text-area');
const chatBox = document.querySelector('.chat-box');
const clearBtn = document.querySelector('.clear-btn');
const socket = io();

console.log(socket);

socket.on('add-message', function(data) {
    addMessage(data);
});

sendMessageBtn.addEventListener('click', function(evt) {
    socket.emit('add-message', {
        newMessage: textArea.value
    });
});

clearBtn.addEventListener('click', function() {
    chatBox.innerHTML = "";
});

do {
    username = getUsername();
}   while (username.length < 2);
  
// socket.emit('register-player', initials);
  
function getUsername() {
    var input = prompt("Please enter your username");
    return input ? input : '';
}

function addMessage({newMessage}) {
    let newPara = document.createElement('p');
    let text = document.createTextNode(`${newMessage}`)
    newPara.appendChild(text);
    chatBox.appendChild(newPara);
    textArea.value = '';
}