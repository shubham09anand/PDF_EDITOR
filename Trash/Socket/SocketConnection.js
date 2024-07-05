const { io } = require('socket.io-client');

const connectSocket = () =>{
     const io = require('socket.io')(3001, {
          cors: {
               origin: "http://localhost:3000",
               methods: ['GET', 'POST']
          }
     });

     return io;
}

module.exports = connectSocket;