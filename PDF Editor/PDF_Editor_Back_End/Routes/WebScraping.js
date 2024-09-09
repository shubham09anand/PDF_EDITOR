const express = require("express");

const router = express.Router();

// route to make google search api request
const { getGoogleLink } = require("../Controller/Web Scrapping/googleCustomSearchApi");

//route to scrap data from web page
const { scrapeWebpage } = require("../Controller/Web Scrapping/getContentOfArticle");

// route to get the images
const { getImages } = require("../Controller/Web Scrapping/getImages");

router.post('/googleSearch', getGoogleLink);
router.post('/scrapeWebpage', scrapeWebpage);
router.post('/getImages', getImages);

module.exports = router;