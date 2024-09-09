const express = require("express");

const router = express.Router();

//route to AI Text To Text Support
const { aiTextSupport } = require("../Controller/WritingSupport/AiTextSupport");

//route to genrate image genrator
const { ImageAiController } = require("../Controller/WritingSupport/ImageAiController");

router.post('/aiTextSupport', aiTextSupport);
router.post('/aiImage', ImageAiController);

module.exports = router;