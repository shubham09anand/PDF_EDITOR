const { Server } = require('socket.io');
const cron = require('node-cron');

const documents = {};

// Function to set up socket.io server
const setupSocket = (server) => {
  const io = new Server(server, {
    maxHttpBufferSize: 12 * 1024 * 1024,
    cors: {
      origin: ["http://localhost:3000", "http://127.0.0.1:3000", 'https://pdfcollaborator.shubham09anand.in/', 'http://pdfcollaborator.shubham09anand.in/'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      optionsSuccessStatus: 200,
      credentials: true,
      allowedHeaders: 'Content-Type, Authorization',
    }
  });

  // Cron job to clear documents every 30 minutes
  cron.schedule('*/30 * * * *', () => {
    Object.keys(documents).forEach(docId => {
      delete documents[docId]; // Clear each document
      console.log(`Document ${docId} cleared from memory.`);
    });
    console.log('All documents cleared from memory every 30 minutes.');
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join-room", (docId) => {
      console.log(`User joining room: ${docId}`);
      socket.join(docId);

      // Load the document content for the user
      socket.emit('load-document', documents[docId] || '');
    });

    // Load document when a user requests it
    socket.on('get-document', (docId) => {
      socket.emit('load-document', documents[docId] || '');
    });

    // Handle changes made to the document and broadcast to the room
    socket.on('send-changes', (newContent) => {
      const docId = Array.from(socket.rooms)[1]; // Get the document ID from the room
      documents[docId] = newContent;  // Store the updated content in memory
      socket.to(docId).emit('receive-changes', newContent); // Broadcast changes
    });

    // Handle sending and forwarding messages
    socket.on('send-message', (data) => {
      console.log(`Message received: ${data.message}`);
      io.to(data.docId).emit('forward-message', data);
    });

    // Handle sending and forwarding photos
    socket.on('send-photo', (data) => {
      console.log("Photo received");
      io.to(data.docId).emit('forward-photo', data);
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

module.exports = { setupSocket };