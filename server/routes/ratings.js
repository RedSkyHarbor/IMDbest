const express = require('express');
const router = express.Router();
const { getRatings, getRating, postRating } = require('../controllers/ratings');

router.get('/:movieId', getRatings);
router.get('/:movieId/:userId', getRating);
router.post('/', postRating);

module.exports = router;