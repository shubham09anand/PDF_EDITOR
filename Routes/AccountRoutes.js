const express = require("express");

const router = express.Router();

const {signUp} = require('../Controller/Account/SignUpController');

router.post('/signUp', signUp);

module.exports = router;