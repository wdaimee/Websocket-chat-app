const sendMessageBtn = document.querySelector('.send-btn');
const textArea = document.querySelector('.text-area');
const chatBox = document.querySelector('.chat-box');
const clearBtn = document.querySelector('.clear-btn');
const socket = io();

console.log(socket);

sendMessageBtn.addEventListener('click', () => addMessage())
clearBtn.addEventListener('click', function() {
    chatBox.innerHTML = "";
});

function addMessage() {
    let newMessage = textArea.value;
    let newPara = document.createElement('p');
    let text = document.createTextNode(`${newMessage}`)
    newPara.appendChild(text);
    chatBox.appendChild(newPara);
    textArea.value = '';
}