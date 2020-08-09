const express = require('express');
const router = express.Router();
const { postRating } = require('../controllers/ratings');


router.post('/', postRating);

module.exports = router;