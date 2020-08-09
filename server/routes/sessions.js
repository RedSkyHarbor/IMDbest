const express = require('express');
const sessionController = require('../controllers/sessions');
const router = express.Router();

router.post('/registration', sessionController.postRegistration);

// TODO log in, log out

module.exports = router;