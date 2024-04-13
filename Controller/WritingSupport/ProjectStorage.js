const ProjectStorageSchema = require("../../Models/ProjectStroageModel");

const projectStroage = async (req, res) => {
     try {
          const storeData = req.body;
          console.log(storeData);

          const newStorage = await ProjectStorageSchema.create(storeData);

          if (newStorage) {
               res.status(200).json({
                    success: true,
                    status: 1,
                    stroage: newStorage,
                    message: "New Document Created Succesfully"
               })
          } else {
               res.status(400).json({
                    success: false,
                    status: 0,
                    message: "New Document Creatation Failed"
               })
          }
     } catch (error) {
          console.log(error)
          res.status(500).json({
               success: false,
               message: "Internal Server Error"
          })
     }
}

module.exports = { projectStroage };
