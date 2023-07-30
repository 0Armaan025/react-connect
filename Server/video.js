
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new socketIO.Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(cors())

const PORT = process.env.PORT || 3003;

const usersInRoom = {}; //all user(socket id) connected to a chatroom
const socketToRoom = {}; //roomId in which a socket id is connected

io.on('connection', socket => {
    console.log('Some one joined socketId: ' + socket.id);
    socket.on("joinRoom", roomId => {
        console.log('Joined roomId: ' + roomId + " socketId: " + socket.id + ' userId: ' + socket.userId);
        if (usersInRoom[roomId]) {
            usersInRoom[roomId].push(socket.id);
        } else {
            usersInRoom[roomId] = [socket.id];
        }
        socketToRoom[socket.id] = roomId;
        const usersInThisRoom = usersInRoom[roomId].filter(id => id !== socket.id);
        socket.join(roomId); //for message
        socket.emit("usersInRoom", usersInThisRoom); //sending all socket id already joined user in this room
    });

    //client send this signal to sever and sever will send to other user of peerId(callerId is peer id)
    socket.on("sendingSignal", payload => {
        console.log(payload.callerId);
        io.to(payload.userIdToSendSignal).emit('userJoined', { signal: payload.signal, callerId: payload.callerId });
    });

    //client site receive signal of other peer and it sending its own signal for other member
    socket.on("returningSignal", payload => {
        io.to(payload.callerId).emit('takingReturnedSignal', { signal: payload.signal, id: socket.id });
    });

    //from client send message to send all other connected user of same room
    socket.on('sendMessage', payload => {
        //sending message to all other connected user at same room
        io.to(payload.roomId).emit('receiveMessage', { message: payload.message, name: payload.name, username: payload.username });
    });

    //someone left room
    socket.on('disconnect', () => {
        const roomId = socketToRoom[socket.id];
        let socketsIdConnectedToRoom = usersInRoom[roomId];
        if (socketsIdConnectedToRoom) {
            socketsIdConnectedToRoom = socketsIdConnectedToRoom.filter(id => id !== socket.id);
            usersInRoom[roomId] = socketsIdConnectedToRoom;
        }
        socket.leave(roomId); //for message group(socket)
        socket.broadcast.emit("userLeft", socket.id); //sending socket id to all other connected user of same room without its own
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
