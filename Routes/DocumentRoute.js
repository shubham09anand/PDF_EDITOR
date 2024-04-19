const express = require("express");

const router = express.Router();

// route to create a new document
const {createDoc} = require('../Controller/Document/CreateDocument');

// route to update a existing document name
const {updateDocName} = require('../Controller/Document/UpdateDocumentName');

// route to update a existing document
const {updateDoc} = require('../Controller/Document/UpdateDocumentContent');

// route to get all doc of a user
const { getDocument } = require("../Controller/Document/getDocumentList");

// route to validate link
const { validateLink } = require("../Controller/Document/ValidateLink");

// route to fetch existing document data
const { getDocumentData } = require("../Controller/Document/getDoumentData");


router.post('/createDoc', createDoc);
router.post('/updateDoc', updateDoc);
router.post('/updateDocName', updateDocName);
router.post('/getDocumentList', getDocument);
router.post('/validateLink', validateLink);
router.post('/getDocumentData', getDocumentData);


module.exports = router;