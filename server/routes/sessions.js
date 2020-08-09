const express = require('express');
const { postRegistration } = require('../controllers/sessions');
const router = express.Router();

router.post('/registration', postRegistration);

// TODO log in, log out

module.exports = router;