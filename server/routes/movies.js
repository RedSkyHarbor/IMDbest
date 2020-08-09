const express = require('express');
const router = express.Router();
const { getMovies, getMovie, searchMovie, postMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.get('/search/:title', searchMovie);
router.get('/:id', getMovie);
router.post('/', postMovie);


module.exports = router;