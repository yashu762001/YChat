//  This is node server which will handle socket io connections.

const io = require('socket.io')(8000);

// Upar Maine socket banaya hai. Basically I want to use web socket at port number 8000.

const users = {};

io.on('connection', socket=> {
    socket.on('new-user-joined', name=> {
        console.log("New User",  name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    })

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id]
    })

    // This is a predefined method in the node server ie socket.io.
})