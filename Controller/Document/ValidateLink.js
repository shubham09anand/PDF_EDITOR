const DocumentSchema = require("../../Models/DocumentModel.js");

const validateLink = async (req, res) => {
     try {
          const docData = req.body;
          console.log(docData);
          

          // Check document exists or not
          const existingDoc = await DocumentSchema.findOne({ docID: docData.docID });

          if (existingDoc) {
               // Document exists with give id
               res.status(200).json({
                    success: true,
                    status: 1,
                    message: "Document Exists",
               });
          } else {
               // Document doesn't exist with given id
               res.status(200).json({
                    success: false,
                    status: 0,
                    message: "Document No Exists",
               });
          }
     } catch (error) {
          console.log(error);
          res.status(500).json({
               success: false,
               status: -1,
               message: "Internal Server Error",
          });
     }
};

module.exports = { validateLink };
