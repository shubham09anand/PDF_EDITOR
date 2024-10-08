const { Server } = require('socket.io');

const documents = {};

// Socket setup function
const setupSocket = (server) => {
  const io = new Server(server, {
    maxHttpBufferSize: 12 * 1024 * 1024,
    cors: {
      origin: [process.env.REACT_APP_API_SOCKET_NETWORK, process.env.REACT_APP_API_SOCKET, 'http://localhost:3000'],
      methods: ['GET', 'POST'],
      credentials: true,
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // User joins a room
    socket.on("join-room", (docId) => {
      console.log(`Joining room: ${docId}`);
      socket.join(docId);
      socket.emit('load-document', documents[docId] || '');
    });

    // Load document for user
    socket.on('get-document', (docId) => {
      socket.emit('load-document', documents[docId] || '');
    });

    // Handle changes made to the document and broadcast to the room
    socket.on('send-changes', (newContent) => {
      const docId = Array.from(socket.rooms)[1];
      documents[docId] = newContent;
      socket.to(docId).emit('receive-changes', newContent);
    });
    // Send and forward messages
    socket.on('send-message', (data) => {
      console.log(`Message received: ${data.message}`);
      socket.join(data.docId);
      io.to(data.docId).emit('forward-message', data);
    });

    // Send and forward photos
    socket.on('send-photo', (data) => {
      console.log("Photo received");
      socket.join(data.docId);
      io.to(data.docId).emit('forward-photo', data);
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

module.exports = { setupSocket };
