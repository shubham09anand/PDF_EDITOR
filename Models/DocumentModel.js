const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
     {
          docID: {
               type: String,
               required: [true, "Doc ID is required"],
               trim: true,
          },
          docName: {
               type: String,
               required: [true, "Doc Name is required"],
               trim: true,
          },
          docAdmin: {
               type: String,
               required: [true, "Doc Admin is required"],
               trim: true,
          },
          docContent: {
               type: Object,
               required: [true, "Doc Admin is required"],
          },
     },
     { timestamps: true }
);

module.exports = mongoose.model("DocumentSchema", DocumentSchema, "DocumentSchemaCollection");
