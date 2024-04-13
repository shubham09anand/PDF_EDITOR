const DocumentSchema = require("../../Models/DocumentModel.js");

const createDoc = async (req, res) => {
    try {
        const docData = req.body;

        // Check document exists or not
        const existingDoc = await DocumentSchema.findOne({ docID: req.body.docID });

        if (existingDoc) {
            // Document exists, update its name
            const updateDoc = await DocumentSchema.updateOne(
                { docID: docData.docID },
                { $set: { docContent: docData.docContent } }
            );

            if (updateDoc.acknowledged === true) {
                res.status(200).json({
                    success: true,
                    status: 1,
                    message: "Content of Document Updated Successfully",
                    updatedDocument: updateDoc,
                });
            } else {
                res.status(200).json({
                    success: false,
                    status: 0,
                    message: "Update Failed: Update operation not acknowledged",
                });
            }
        } else {
            // Document doesn't exist, create a new one
            const newDocument = await DocumentSchema.create(docData);
            res.status(200).json({
                success: true,
                status: 1,
                message: "Document Created Successfully",
                document: newDocument,
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

module.exports = { createDoc };
