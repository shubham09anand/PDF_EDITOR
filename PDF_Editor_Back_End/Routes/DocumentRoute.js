const express = require("express");

const router = express.Router();

// route to download the pdf
const { generatePDF } = require("../Controller/Document/getDocumentPDF");

router.post('/generate-pdf', generatePDF);


module.exports = router;