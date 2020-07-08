const params = new URLSearchParams(window.location.search)
const username = params.get('username')
const messages_element = document.querySelector("#messages")

const socket = io('/tech');
$('form').submit(() => {
    let msg = $('#m').val();
    socket.emit('message', { msg, room, username });
    $('#m').val('');
    return false;
});

socket.on('connect', () => {
    // emiting to everybody
    socket.emit('join', { room, username });
})

socket.on('message', (msg) => {
    const newMessageElement = `<li class="message"><h2>${msg.username}:</h2><p>${msg.message}</p></li>`
    const li = document.createElement('li')
    li.innerHTML = newMessageElement
    messages_element.appendChild(li)
})