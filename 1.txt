const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

const connectDB = require("./DatabseConnection/connection.js");

const io = require('socket.io')(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST']
  }
});

// Simple in-memory storage for documents
const documents = {};

io.on("connection", socket => {
  console.log("Client connected:", socket.id);

  socket.on('get-document', documentId => {
    // If the document exists, send it. Otherwise, initialize a new empty document.
    const data = documents[documentId] || { ops: [] };

    socket.join(documentId);
    socket.emit('load-document', data);

    socket.documentId = documentId;
  });

  socket.on('send-changes', delta => {

    const documentId = socket.documentId;
    if (documentId) {
      // Apply the delta to the document and broadcast the changes
      documents[documentId] = applyDelta(documents[documentId], delta);
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    }
  });

  socket.on('disconnect', () => {
    console.log("Client disconnected:", socket.id);
  });
});

function applyDelta(doc, delta) {
  const QuillDelta = require('quill-delta');
  const currentDoc = new QuillDelta(doc);
  const updatedDoc = currentDoc.compose(delta);
  return updatedDoc;
}

const port =  process.env.PORTS || 8080;

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

app.listen(port, () => {
  console.log("Node is running at :" + port);
});
