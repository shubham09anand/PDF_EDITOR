const DocumentSchema = require("../../Models/DocumentModel.js");

const updateDocName = async (req, res) => {
    // console.log("update Name");
    try {
        // console.log(req.body.docID);
        const docData = req.body;

        const existingDoc = await DocumentSchema.findOne({ docID: req.body.docID });

        if (existingDoc) {
            const updateDoc = await DocumentSchema.updateOne(
                { docID: docData.docID },
                { $set: { docName: docData.newName } }
            );

            // Check if the update operation was acknowledged by MongoDB
            if (updateDoc.acknowledged === true) {
                res.status(200).json({
                    success: true,
                    status: 1,
                    message: "Name of Document Updated Successfully",
                    updatedDocument: updateDoc, // You can send the update result if needed
                });
            } else {
                res.status(200).json({
                    success: false,
                    status: 0,
                    message: "Updataion Failed: Update operation not acknowledged",
                });
            }
        } else {
            res.status(200).json({
                success: false,
                status: 0,
                message: "No Such Doc Exists",
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

module.exports = { updateDocName };
