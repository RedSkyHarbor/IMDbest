const express = require('express');
const router = express.Router();
const { getRatings, postRating } = require('../controllers/ratings');

router.get('/:movieId', getRatings);
router.post('/', postRating);

module.exports = router;