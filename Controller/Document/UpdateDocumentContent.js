const DocumentSchema = require("../../Models/DocumentModel.js");

const updateDoc = async (req, res) => {
     console.log("update");
     try {
          // console.log(req.body);
          const docData = req.body;

          const exisitingDoc = await DocumentSchema.findOneAndUpdate(
               { docID: docData.docId },
               {
                    docContent: docData.content,
               },
          );

          if (exisitingDoc) {
               res.status(200).json({
                    success: true,
                    status: 1,
                    message: "Document Updated Succesfully",
               })
          } else {
               res.status(400).json({
                    success: false,
                    status: 0,
                    message: "No Such Doc Exists",
               })
          }
     } catch (error) {
          console.log(error)
          res.status(500).json({
               success: false,
               status: -1,
               message: "Internal Server Error",
          })
     }
}

module.exports = { updateDoc };
