const DocumentSchema = require("../../Models/DocumentModel.js");

const getDocumentData = async (req, res) => {
     // console.log("get doc");
     try {
          console.log(req.body);
          const docData = req.body;

          const exisitingDoc = await DocumentSchema.findOne(
               { docAdmin: docData.userId, docID: docData.docID },
          );

          if (exisitingDoc) {
               res.status(200).json({
                    success: true,
                    status: 1,
                    doc: exisitingDoc,
                    message: "Data Fetched",
               })
          } else {
               res.status(200).json({
                    success: false,
                    status: 0,
                    message: "Data Not Found $)$",
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

module.exports = { getDocumentData };
