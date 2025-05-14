const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const http = require('http');
const os = require('os');
const { setupSocket } = require('./socket.js');

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = 8080;

app.use(bodyParser.json({ limit: '100mb' }));
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000",'https://pdfcollaborator.shubham09anand.in/', 'http://pdfcollaborator.shubham09anand.in/'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization',
}));
app.use(express.json());

// Routes
app.use("/auth", require('./Routes/DocumentRoute.js'));
app.use("/auth", require('./Routes/SupportRoutes.js'));
app.use("/auth", require('./Routes/WebScraping.js'));

// Setup socket.io
setupSocket(server); // Initialize socket.io with the correct CORS settings

// Helper function to get local IP
const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const iface in interfaces) {
    for (const address of interfaces[iface]) {
      if (address.family === 'IPv4' && !address.internal) {
        return address.address;
      }
    }
  }
  return '127.0.0.1'; // Fallback to localhost if no IP found
};

// Start the server
server.listen(PORT, () => {
  const localIP = getLocalIP();
  console.log(`Server running at http://${localIP}:${PORT}`);
});