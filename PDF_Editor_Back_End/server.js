const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const PORT = 8080;

app.use(bodyParser.json({ limit: '100mb' }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Including existing routes
app.use("/auth", require('./Routes/DocumentRoute.js'));
app.use("/auth", require('./Routes/SupportRoutes.js'));
app.use("/auth", require('./Routes/WebScraping.js'));

const documents = {};

const io = new Server(server, {
  cors: {
    origin: process.env.REACT_APP_API_SOCKET,
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {

  socket.on("join-room", (docId) => {
    socket.join(docId);

    socket.emit('load-document', documents[docId] || '');

  });

  socket.on('get-document', (docId) => {
    socket.emit('load-document', documents[docId] || '');
  });

  socket.on('send-changes', (newContent) => {
    const docId = Array.from(socket.rooms)[1];
    documents[docId] = newContent;
    socket.to(docId).emit('receive-changes', newContent);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('signal', (data) => {
    io.to(data.to).emit('signal', data);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ host: 'localhost', port: 8080 });

// wss.on('connection', (ws) => {
//   console.log('A new client connected!');

//   ws.on('message', (message) => {
//     console.log(`Received message: ${message}`);
//     // Broadcast the message to all connected clients except the sender
//     wss.clients.forEach((client) => {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   });

//   ws.on('close', () => {
//     console.log('Client disconnected.');
//   });
// });

// console.log('WebSocket server is running on ws://192.168.1.5:8080');

