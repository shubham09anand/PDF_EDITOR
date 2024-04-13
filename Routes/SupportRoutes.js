const express = require("express");

const router = express.Router();

// route to create a new stroage or update a existing stroage
const { projectStroage } = require("../Controller/WritingSupport/ProjectStorage");

//route to AI Text To Text Support
const { aiTextSupport } = require("../Controller/WritingSupport/AiTextSupport");



router.post('/projectStroage', projectStroage);
router.post('/aiTextSupport', aiTextSupport);

module.exports = router;