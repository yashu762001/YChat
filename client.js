const socket = io('http://localhost:8000')

const form = document.getElementById('sendcontainer')

const messageInput = document.getElementById('messageInp')

const messageContainer = document.querySelector('.container')

var audio = new Audio('images/ios_notification.mp3')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = messageInp.value
    append(`You: ${message}`, 'right')
    socket.emit('send', message)
    messageInp.value = ""
} )

const append = (message, position) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    if(position=='left') {
        audio.play()
    }
}

const name = prompt('Enter Your Name To Join')
document.getElementById('name').innerText = name

socket.emit('new-user-joined', name)

socket.on('user-joined', name => {
        if(name!=null) {
    append(`${name} joined The chat`,'right')
        }
} )

socket.on('receive', data => {
        if(data.name!=null)  {
    append(`${data.name}: ${data.message}`, 'left')

        }
})

socket.on('left', name=> {
        if(name!=null) {
    append(`${name} left the chat`, 'left')
        }
})