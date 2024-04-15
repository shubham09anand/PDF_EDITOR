const express = require("express");

const router = express.Router();

// route to create a new document
const {createDoc} = require('../Controller/Document/CreateDocument');

// route to update a existing document name
const {updateDocName} = require('../Controller/Document/UpdateDocumentName');

// route to update a existing document
const {updateDoc} = require('../Controller/Document/UpdateDocumentContent');

// route to get all doc of a user
const { getDocument } = require("../Controller/Document/getDocument");

// route to validate link
const { validateLink } = require("../Controller/Document/ValidateLink");


router.post('/createDoc', createDoc);
router.post('/updateDoc', updateDoc);
router.post('/updateDocName', updateDocName);
router.post('/getDocument', getDocument);
router.post('/validateLink', validateLink);

module.exports = router;