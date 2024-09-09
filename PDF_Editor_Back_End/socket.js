const socketIO = require('socket.io');

module.exports = function(server) {
     const io = socketIO(server, {
          cors: {
               origin: "http://localhost:3000",
               methods: ['GET', 'POST']
          }
     });

     const documents = {};

     io.on("connection", socket => {
          console.log("Client connected:", socket.id);

          socket.on('get-document', documentId => {
               const data = documents[documentId] || { ops: [] };

               socket.join(documentId);
               socket.emit('load-document', data);

               socket.documentId = documentId;
          });

          socket.on('send-changes', delta => {
               const documentId = socket.documentId;
               if (documentId) {
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
};
