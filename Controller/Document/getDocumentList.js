const DocumentSchema = require("../../Models/DocumentModel.js");

const getDocument = async (req, res) => {
     console.log("get doc");
     try {
          console.log(req.body);
          const docData = req.body;

          const exisitingDoc = await DocumentSchema.find(
               { docAdmin: docData.userId },
               // { docID: docData.docID },
          );

          if (exisitingDoc) {
               res.status(200).json({
                    success: true,
                    status: 1,
                    doc: exisitingDoc,
                    message: "Doc Found",
               })
          } else {
               res.status(400).json({
                    success: false,
                    status: 0,
                    message: "Doc does not Exists",
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

module.exports = { getDocument };
