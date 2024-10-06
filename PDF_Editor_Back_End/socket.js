const { Server } = require('socket.io');

const documents = {};

// Socket setup function
const setupSocket = (server) => {
  const io = new Server(server, {
    maxHttpBufferSize: 12 * 1024 * 1024,
    cors: {
      origin: process.env.REACT_APP_API_SOCKET_NETWORK,
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    // console.log(`User connected: ${socket.id}`);

    // User joins a room
    socket.on("join-room", (docId) => {
      console.log(docId)
      socket.join(docId);
      socket.emit('load-document', documents[docId] || '');
    });

    // Load document for user
    socket.on('get-document', (docId) => {
      socket.emit('load-document', documents[docId] || '');
    });

    // Handle changes made to the document and broadcast to room
    socket.on('send-changes', (newContent) => {
      const docId = Array.from(socket.rooms)[1];
      documents[docId] = newContent;
      socket.to(docId).emit('receive-changes', newContent);
    });

    // Send and forward messages
    socket.on('send-message', (data) => {
      console.log(data)
      console.log(`Message received: ${data.message}`);

      socket.join(data.docId);
      // Emit the message to everyone else in the room (except the sender)
      io.to(data.docId).emit('forward-message', data);
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

module.exports = { setupSocket };
