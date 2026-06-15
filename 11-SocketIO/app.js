const express = require('express');
const http = require('http');
const path = require('path');

const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server)

app.use(express.static(path.resolve('./public')));

app.use('/', (req, res) => {
    return res.sendFile('/public/index.html');
})


// Socket io
io.on('connection', (socket) => {
    const id = socket.id;
    socket.on('message', (msg)=>{
        io.emit('user-msg', {msg, id});
    })
})


server.listen(3000, () => console.log("Server is running in port: 3000"));

