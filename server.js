const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const http = require('http');
dotenv.config();
const app = express();
const connectDB = require("./DatabseConnection/connection.js");

const port = process.env.PORTS || 8080;

// Setup Express and Middleware
app.use(bodyParser.json({ limit: '100mb' }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
connectDB();

// Including existing routes
app.use("/auth", require('./Routes/DocumentRoute.js'));
app.use("/auth", require('./Routes/AccountRoutes.js'));
app.use("/auth", require('./Routes/SupportRoutes.js'));
app.use("/auth", require('./Routes/WebScraping.js'));

// Create HTTP server and pass the Express app as middleware
const server = http.createServer(app);

// Initialize Socket.IO and attach it to the server
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",  // Update this to your frontend URL
    methods: ['GET', 'POST']
  }
});

// Simple in-memory storage for documents and users
const documents = {};
const users = {}; // This will track users by document ID

io.on("connection", socket => {
  // console.log('A user connected:', socket.id);

  socket.on('get-document', documentId => {
    const data = documents[documentId] || { ops: [] };

    socket.join(documentId);
    socket.emit('load-document', data);

    socket.documentId = documentId;

    // Send current users in the room to the newly joined user
    const currentUsers = users[documentId] || [];
    socket.emit('current-users', currentUsers);
  });

  socket.on('send-changes', delta => {
    const documentId = socket.documentId;
    if (documentId) {
      // Apply the delta to the document and broadcast the changes
      documents[documentId] = applyDelta(documents[documentId], delta);
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    }
  });

  socket.on('user-joined', ({ name, docId }) => {
    console.log(`${name} has joined document ${docId}`);
    
    // Add the user to the list of users for this document
    if (!users[docId]) users[docId] = [];
    users[docId].push(name);

    // Notify all users in the room
    io.to(docId).emit('new-user', { name, docId });

    // Notify the new user of the current list of users
    socket.emit('current-users', users[docId]);
  });

  socket.on('disconnect', (data,data1) => {
    console.log(data1)
    const documentId = socket.documentId;
    if (documentId && users[documentId]) {
      const userName = socket.username;
      
      // Remove the user from the list of users
      users[documentId] = users[documentId].filter(user => user !== userName);

      // Notify all remaining users in the room
      io.to(documentId).emit('user-left', { name: userName, docId: documentId });

      // Clean up if no users are left in the document
      if (users[documentId].length === 0) {
        delete users[documentId];
      }
    }
  });
});

// Helper function to apply a delta to a document
function applyDelta(doc, delta) {
  const QuillDelta = require('quill-delta');
  const currentDoc = new QuillDelta(doc);
  const updatedDoc = currentDoc.compose(delta);
  return updatedDoc;
}

// Start the HTTP server and Socket.IO together
server.listen(port, () => {
  console.log("Node is running at :" + port);
});
