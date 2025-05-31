const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('register', (userId) => {
    console.log(`Registering userId ${userId} to socket ${socket.id}`);
    connectedUsers.set(userId, socket.id);
  });

  socket.on('send-notification', async (data) => {
    const { userId, title, message ,sender_id} = data;

    if (userId) {
      connectedUsers.set(userId, socket.id); 
    }

    try {
      await axios.post('http://localhost:8000/api/notifications', data);
    } catch (err) {
      console.error('Error saving notification to Laravel:', err.message);
    }

    const socketId = connectedUsers.get(userId);
    if (socketId) {
      io.to(socketId).emit('receive-notification', {
        sender_id ,
        user_id: userId,
        title,
        message,
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    for (const [userId, sockId] of connectedUsers.entries()) {
      if (sockId === socket.id) {
        connectedUsers.delete(userId);
        break;
      }
    }
  });
});

app.post('/api/notify', (req, res) => {
  const { userIds, title, message } = req.body;
  console.log('Laravel Notify API called:', { userIds, title });

  userIds.forEach((userId) => {
    const socketId = connectedUsers.get(userId);
    if (socketId) {
      io.to(socketId).emit('receive-notification', {
        user_id: userId,
        title,
        message,
      });
    }
  });

  res.status(200).json({ success: true, message: "Notifications sent" });
});

server.listen(3001, () => {
  console.log('Socket.IO server running on http://localhost:3001');
});
