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
    origin: process.env.REACT_APP_API_SOCKET_NETWORK,
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
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
