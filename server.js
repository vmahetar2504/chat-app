const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// When a client connects
io.on('connection', (socket) => {
    console.log('🟢 A user connected:', socket.id);

    // Receive message from one client and send to all
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);  // Broadcast to ALL users
    });

    // When a client disconnects
    socket.on('disconnect', () => {
        console.log('🔴 A user disconnected:', socket.id);
    });
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
