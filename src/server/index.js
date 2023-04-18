const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// middleware
app.use(express.static(path.join(__dirname, "../client")));

// app.get('/', (req, res) => {
//     res.status(200).send("Welcome");
// });

var messages = [
    {
        id: 1,
        text: '¡Bienvenido al chat con Node.js y Socket.io!',
        nickname: "kanethBot"
    }
];

io.on('connection', (socket) => {
    console.log("Client IP: " +socket.handshake.address+ " is conected...")

    socket.emit('messages', messages);

    socket.on('add-message', function(data) {
        messages.push(data)

        io.sockets.emit('messages', messages);
    });
});

server.listen(6677, () => {
    console.log("Server on port: ", 6677)
});
