const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const connectDB = require("./DatabseConnection/connection.js");

const io = require('socket.io')(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST']
  }
});

io.on("connection", socket => {
  socket.on('get-document', documentId => {
    const data = "shubham";
    socket.join(documentId);
    socket.emit('load-document' , data)
    socket.on('send-changes', (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })
  })
  
  
})

const app = express();
const port = 3200;

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