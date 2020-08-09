const { Validator } = require('node-input-validator');
const { post_rating } = require('../services/ratings');

// TODO delete rating, get ratings for a movie, update rating
// TODO make sure user doesnt have two ratings for same movie

const postRating = async (req, res) => {

    const validator = new Validator(req.body, {
        movieId: 'required|integer',
        userId: 'required|integer',
        comment: 'required|string|minLength:3|maxLength:2055',
        rating: 'required|decimal'
    });

    const matched = await validator.check();

    if (!matched) {
        res.status(422).send(validator.errors);
        return;
    }

    if (req.body.rating < 0 || req.body.rating > 10) {
        res.status(422).send('rating must be between 0 and 10');
        return;
    }

    let result = {}
    try {
        const { movieId, userId, comment, rating } = req.body;
        result.response = await post_rating(movieId, userId, comment, rating);
        res.status(200);
    } catch (e) {
        res.status(400);
        result.response = false;
    } finally {
        res.header('content-type', 'application/json');
        res.send(JSON.stringify(result));
    }

}

module.exports = {
    postRating
}