const mongoose = require("mongoose");

const ProjectStorage = new mongoose.Schema(
     {
          projectId: {
               type: String,
               required: [true, "Doc ID is required"],
          },
          projectStorageContent: [
               {
                    type: String,
                    required: true,
               }
          ],

     },
     { timestamps: true }
);

module.exports = mongoose.model("ProjectStorage", ProjectStorage, "ProjectStorageCollection");