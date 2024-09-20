const express = require("express");

const router = express.Router();

// route to download the pdf
const { generatePDF } = require("../Controller/Document/getDocumentPDF");
const { wordToPdf } = require("../Controller/Document/wordtopdf");

router.post('/generate-pdf', generatePDF);
router.post('/word-pdf', wordToPdf);


module.exports = router;